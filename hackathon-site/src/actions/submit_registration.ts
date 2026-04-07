"use server";

import { createClient } from "@supabase/supabase-js";

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

export async function submitRegistration(formData: FormData) {
  const supabaseAdmin = getSupabaseAdminClient();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const emailLocalPart = email.split("@")[0] ?? "";
  const hackathon_exp = String(formData.get("hackathon_experience") ?? "").trim();
  const ai_exp = String(formData.get("ai_experience") ?? "").trim();
  const resume = formData.get("resume") as File | null;

  if (!name) {
    throw new Error("Name is required.");
  }

  if (!email.endsWith("@oregonstate.edu")) {
    throw new Error("Please use an email ending in @oregonstate.edu");
  }

  if (!emailLocalPart) {
    throw new Error("Invalid email address.");
  }

  let resume_url: string | null = null;

  //Uploading resume to Resumes bucket in supabase
  if (resume && resume.size > 0) {
    const ext = resume.name.split(".").pop()?.toLowerCase();
    const allowedExts = new Set(["pdf", "doc", "docx"]);

    if (!ext || !allowedExts.has(ext)) {
      throw new Error("Resume must be a PDF, DOC, or DOCX file.");
    }

    const safeEmail = emailLocalPart.replace(/[^a-z0-9._-]/g, "_"); //replace@ with _ in the email path
    const { data, error } = await supabaseAdmin.storage
      .from("Resumes")
      .upload(`${safeEmail}-${Date.now()}.${ext}`, resume, { upsert: false });

    if (error) throw new Error("Resume upload failed: " + error.message);
    resume_url = data.path; // resumeurl field populated with link to resume in the bucket
  }

  const { error } = await supabaseAdmin.from("Submissions").insert({ //insert row into db
    name,
    email,
    hackathon_exp,
    ai_exp,
    resume_url,
  });

  if (error) {
    const isDuplicateEmail =
      error.code === "23505" &&
      (error.message.includes("duplicate key value") ||
        error.message.includes("Submissions_email_key") ||
        error.message.includes("email"));

    if (isDuplicateEmail) {
      throw new Error("You've already applied! We know you're excited, so we'll reach out soon.");
    }

    throw new Error("Submission failed: " + error.message);
  }
}