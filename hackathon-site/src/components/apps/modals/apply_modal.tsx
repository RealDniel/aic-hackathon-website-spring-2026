"use client";

import { useState, type FormEvent } from "react";

type ApplyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
    const [emailError, setEmailError] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget);
        const emailValue = String(formData.get("email") ?? "").trim().toLowerCase();

        if (!emailValue.endsWith("@oregonstate.edu")) {
            event.preventDefault();
            setEmailError("Please use an email ending in @oregonstate.edu");
            return;
        }

        setEmailError("");
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="apply-modal-shell"
            role="dialog"
            aria-modal="true"
            aria-label="Apply"
            onClick={onClose}
        >
            <section className="apply-modal-window" onClick={(event) => event.stopPropagation()}>
                <header className="apply-modal-titlebar">
                    <span className="app-text apply-modal-title text-base leading-none">APPLY</span>
                    <button type="button" className="apply-modal-close" onClick={onClose}>
                        X
                    </button>
                </header>

                <div className="apply-modal-body">
                    <form className="mx-auto flex w-full max-w-3xl flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="apply-name" className="text-m uppercase tracking-[0.12em] text-white/78">
                                Name
                            </label>
                            <input
                                id="apply-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="w-full border border-white/25 bg-black/25 px-3 py-2 text-m text-white/85 outline-none placeholder:text-white/45 focus:border-cyan-200/55"
                                placeholder="Zheng Chen"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="apply-email" className="text-m uppercase tracking-[0.12em] text-white/78">
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
                                className="w-full border border-white/25 bg-black/25 px-3 py-2 text-sm text-white/85 outline-none placeholder:text-white/45 focus:border-cyan-200/55"
                                placeholder="chenz22@oregonstate.edu"
                            />
                            {emailError ? (
                                <p id="apply-email-error" className="text-xs text-red-200/80">
                                    {emailError}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="apply-resume" className="text-m uppercase tracking-[0.12em] text-white/78">
                                Resume (Optional)
                            </label>
                            <input
                                id="apply-resume"
                                name="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="w-full border border-white/25 bg-black/25 px-3 py-2 text-m text-white/78 file:mr-3 file:border file:border-white/30 file:bg-black/35 file:px-3 file:py-1 file:text-xs file:uppercase file:tracking-[0.08em] file:text-white/80"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="apply-experience" className="text-m uppercase tracking-[0.12em] text-white/78">
                                Hackathon Experience
                            </label>
                            <select
                                id="apply-experience"
                                name="experience"
                                required
                                defaultValue=""
                                className="w-full border border-white/25 bg-black/25 px-3 py-2 text-m text-white/85 outline-none focus:border-cyan-200/55"
                            >
                                <option value="" disabled>
                                    Select an option
                                </option>
                                <option value="never">Never competed in a hackathon</option>
                                <option value="few">Competed in a few hackathons</option>
                                <option value="pro">Hackathon pro</option>
                            </select>
                        </div>

                        <p className="pt-1 text-xs leading-relaxed text-white/58">
                            Disclaimer: Resume and experience level are collected purely to help us design engaging events for attendees!
                        </p>

                        <button
                            type="submit"
                            className="mt-1 w-fit border border-white/35 bg-black/35 px-5 py-2 text-sm uppercase tracking-[0.1em] text-white/85 transition-colors hover:border-cyan-200/65 hover:text-white"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}