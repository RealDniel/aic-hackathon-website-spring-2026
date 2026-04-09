"use server";

import { createClient } from "@supabase/supabase-js";

const DUPLICATE_APPLICATION_MESSAGE =
  "You've already applied! We know you're excited, so we'll reach out soon.";

type SubmitRegistrationResult =
  | { ok: true }
  | { ok: false; error: string };

type InsertError = {
  code?: string | null;
  message?: string | null;
};

function isDuplicateEmailError(error: InsertError) {
  const message = error.message ?? "";

  return (
    error.code === "23505" &&
    (message.includes("duplicate key value") ||
      message.includes("Submissions_email_key") ||
      message.includes("email"))
  );
}

function getSupabaseAdminClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in environment variables.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment variables.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function removeUploadedResume(
  supabaseAdmin: ReturnType<typeof getSupabaseAdminClient>,
  uploadedResumePath: string | null
) {
  if (!uploadedResumePath) {
    return;
  }

  const { error } = await supabaseAdmin.storage
    .from("Resumes")
    .remove([uploadedResumePath]);

  if (error) {
    console.error(
      "Failed deleting uploaded resume after submission failure:",
      error.message
    );
  }
}

export async function submitRegistration(
  formData: FormData
): Promise<SubmitRegistrationResult> {
  try {
    const supabaseAdmin = getSupabaseAdminClient();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const emailLocalPart = email.split("@")[0] ?? "";
    const hackathon_exp = String(
      formData.get("hackathon_experience") ?? ""
    ).trim();
    const ai_exp = String(formData.get("ai_experience") ?? "").trim();
    const resume = formData.get("resume") as File | null;

    if (!name) {
      return { ok: false, error: "Name is required." };
    }

    if (!email.endsWith("@oregonstate.edu")) {
      return {
        ok: false,
        error: "Please use an email ending in @oregonstate.edu",
      };
    }

    if (!emailLocalPart) {
      return { ok: false, error: "Invalid email address." };
    }

    // Prevent duplicate submissions before any resume upload.
    const { data: existingSubmission, error: existingSubmissionError } =
      await supabaseAdmin
        .from("Submissions")
        .select("id")
        .eq("email", email)
        .limit(1)
        .maybeSingle();

    if (existingSubmissionError) {
      console.error(
        "Failed checking for existing submission:",
        existingSubmissionError.message
      );
      return { ok: false, error: "Submission failed. Please try again." };
    }

    if (existingSubmission) {
      return { ok: false, error: DUPLICATE_APPLICATION_MESSAGE };
    }

    let resume_url: string | null = null;
    let uploadedResumePath: string | null = null;

    if (resume && resume.size > 0) {
      const ext = resume.name.split(".").pop()?.toLowerCase();
      const allowedExts = new Set(["pdf", "doc", "docx"]);

      if (!ext || !allowedExts.has(ext)) {
        return {
          ok: false,
          error: "Resume must be a PDF, DOC, or DOCX file.",
        };
      }

      const safeEmail = emailLocalPart.replace(/[^a-z0-9._-]/g, "_");
      const { data, error } = await supabaseAdmin.storage
        .from("Resumes")
        .upload(`${safeEmail}-${Date.now()}.${ext}`, resume, { upsert: false });

      if (error) {
        return { ok: false, error: "Resume upload failed: " + error.message };
      }

      resume_url = data.path;
      uploadedResumePath = data.path;
    }

    const { error: insertError } = await supabaseAdmin
      .from("Submissions")
      .insert({
        name,
        email,
        hackathon_exp,
        ai_exp,
        resume_url,
      });

    if (insertError) {
      if (isDuplicateEmailError(insertError)) {
        await removeUploadedResume(supabaseAdmin, uploadedResumePath);
        return { ok: false, error: DUPLICATE_APPLICATION_MESSAGE };
      }

      await removeUploadedResume(supabaseAdmin, uploadedResumePath);
      console.error("Submission failed:", insertError.message);
      return { ok: false, error: "Submission failed. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Unexpected registration submission failure:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}