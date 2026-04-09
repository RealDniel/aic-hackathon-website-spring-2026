"use client";

import { useState, type FormEvent } from "react";
import { submitRegistration } from "@/src/actions/submit_registration";

type ApplyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [submitError, setSubmitError] = useState("")
    const [emailError, setEmailError] = useState("");
    const raisedBorder = "border border-solid [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)]";
    const sunkenBorder = "border border-solid [border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)]";
    const dottedFocus = "focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-black focus-visible:outline-offset-[-3px]";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError("");

        const formData = new FormData(event.currentTarget);
        const emailValue = String(formData.get("email") ?? "").trim().toLowerCase();

        if (!emailValue.endsWith("@oregonstate.edu")) {
            setEmailError("Please use an email ending in @oregonstate.edu");
            return;
        }

        setEmailError("");
        setStatus("loading")

        try {
            const result = await submitRegistration(formData);

            if (!result.ok) {
                setSubmitError(result.error);
                setStatus("error");
                return;
            }

            setStatus("success")
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setStatus("error");
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[35] grid place-items-center bg-black/20 p-[0.9rem] max-[760px]:items-start max-[760px]:p-[0.45rem] max-[760px]:pb-[calc(var(--taskbar-height)+0.45rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Apply"
            onClick={onClose}
        >
            <section
                className={`flex w-[min(48rem,calc(100vw-1rem))] max-h-[calc(100vh-var(--taskbar-height)-1.2rem)] flex-col overflow-hidden bg-[var(--win95-face)] shadow-[inset_1px_1px_0_var(--win95-light),inset_-1px_-1px_0_var(--win95-shadow),2px_2px_0_#000] max-[760px]:w-full max-[760px]:max-h-[calc(100vh-var(--taskbar-height)-1rem)] ${raisedBorder}`}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex min-h-[1.8rem] items-center justify-between border-b border-b-[var(--win95-shadow)] bg-[linear-gradient(90deg,var(--win95-title-start)_0%,var(--win95-title-end)_100%)] px-[0.45rem] py-[0.2rem] pr-[0.32rem]">
                    <span className="select-none text-[0.84rem] font-bold tracking-[0.02em] text-white">AI CLUB HACKATHON APPLICATION</span>
                    <button
                        type="button"
                        className={`h-[1.15rem] w-[1.2rem] cursor-pointer bg-[var(--win95-face)] text-[0.76rem] font-bold leading-none text-black active:pt-px active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] ${raisedBorder}`}
                        onClick={onClose}
                        aria-label="Close window"
                    >
                        X
                    </button>
                </header>

                <div className="min-h-0 flex-1 overflow-auto p-[0.85rem] text-black">
                    <form className="mx-auto grid w-full max-w-[38rem] gap-[0.7rem]" onSubmit={handleSubmit}>
                        <div className="grid gap-[0.2rem]">
                            <label htmlFor="apply-name" className="text-[0.76rem] font-bold tracking-[0.01em]">
                                Name
                            </label>
                            <input
                                id="apply-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className={`min-h-[1.8rem] w-full bg-white px-[0.4rem] py-[0.25rem] text-[0.8rem] text-black placeholder:text-[#666] outline-none ${sunkenBorder} ${dottedFocus}`}
                                placeholder="Zheng Chen"
                            />
                        </div>

                        <div className="grid gap-[0.2rem]">
                            <label htmlFor="apply-email" className="text-[0.76rem] font-bold tracking-[0.01em]">
                                Oregon State Email
                            </label>
                            <input
                                id="apply-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                inputMode="email"
                                required
                                aria-invalid={Boolean(emailError)}
                                aria-describedby="apply-email-error"
                                className={`min-h-[1.8rem] w-full bg-white px-[0.4rem] py-[0.25rem] text-[0.8rem] text-black placeholder:text-[#666] outline-none ${sunkenBorder} ${dottedFocus}`}
                                placeholder="chenz22@oregonstate.edu"
                            />
                            {emailError ? (
                                <p id="apply-email-error" className="m-0 text-[0.74rem] text-[#8b0000]">
                                    {emailError}
                                </p>
                            ) : null}
                        </div>

                        <div className="grid gap-[0.2rem]">
                            <label htmlFor="apply-resume" className="text-[0.76rem] font-bold tracking-[0.01em]">
                                Resume (Optional)
                            </label>
                            <input
                                id="apply-resume"
                                name="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className={`min-h-[1.8rem] w-full bg-white p-[0.2rem] text-[0.8rem] text-black outline-none file:mr-[0.5rem] file:cursor-pointer file:border file:border-solid file:bg-[var(--win95-face)] file:px-[0.4rem] file:py-[0.18rem] file:text-[0.74rem] file:text-black file:[border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] ${sunkenBorder} ${dottedFocus}`}
                            />
                        </div>

                        <div className="grid gap-[0.2rem]">
                            <label htmlFor="apply-hackathon-experience" className="text-[0.76rem] font-bold tracking-[0.01em]">
                                Hackathon Experience
                            </label>
                            <select
                                id="apply-hackathon-experience"
                                name="hackathon_experience"
                                required
                                defaultValue=""
                                className={`min-h-[1.8rem] w-full bg-white px-[0.4rem] py-[0.25rem] text-[0.8rem] text-black outline-none ${sunkenBorder} ${dottedFocus}`}
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                <option value="low">Never competed in a hackathon</option>
                                <option value="medium">Competed in a few hackathons</option>
                                <option value="high">Hackathon pro</option>
                            </select>
                        </div>

                        <div className="grid gap-[0.2rem]">
                            <label htmlFor="apply-ai-experience" className="text-[0.76rem] font-bold tracking-[0.01em]">
                                AI Experience
                            </label>
                            <select
                                id="apply-ai-experience"
                                name="ai_experience"
                                required
                                defaultValue=""
                                className={`min-h-[1.8rem] w-full bg-white px-[0.4rem] py-[0.25rem] text-[0.8rem] text-black outline-none ${sunkenBorder} ${dottedFocus}`}
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                <option value="low">Brand new to AI!</option>
                                <option value="medium">Familiar with core concepts</option>
                                <option value="high">AI Pro</option>
                            </select>
                        </div>

                        <p className="m-[0.1rem_0] text-[0.74rem]">
                            Disclaimer: Resume and experience level are collected purely to help us design engaging events for attendees!
                        </p>


                        {(status === "success") ? (
                            <p className="m-0 text-[0.74rem] text-[#004f00]">We have received your application and will reach out soon!</p>
                        ) : (
                            <>
                                {submitError && <p className="m-0 text-[0.74rem] text-[#8b0000]">{submitError}</p>}
                                <button
                                type="submit"
                                disabled={status === "loading"}
                                className={`min-h-[1.8rem] w-fit min-w-[7.25rem] cursor-pointer bg-[var(--win95-face)] px-[0.75rem] py-[0.28rem] text-[0.8rem] text-black disabled:cursor-not-allowed disabled:text-[#555] active:pt-[0.34rem] active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] ${raisedBorder} ${dottedFocus}`}
                                >
                                {status === "loading" ? "Submitting..." : "Submit"}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
}