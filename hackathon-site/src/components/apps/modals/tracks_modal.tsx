"use client";

type TracksModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function TracksModal({ isOpen, onClose }: TracksModalProps) {
    const raisedBorder = "border border-solid [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)]";

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[35] grid place-items-center bg-black/20 p-[0.9rem] max-[760px]:items-start max-[760px]:p-[0.45rem] max-[760px]:pb-[calc(var(--taskbar-height)+0.45rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Tracks"
            onClick={onClose}
        >
            <section
                className={`flex w-[min(48rem,calc(100vw-1rem))] min-h-[26rem] max-h-[calc(100vh-var(--taskbar-height)-1.2rem)] flex-col overflow-hidden bg-[var(--win95-face)] shadow-[inset_1px_1px_0_var(--win95-light),inset_-1px_-1px_0_var(--win95-shadow),2px_2px_0_#000] max-[760px]:min-h-[20rem] max-[760px]:w-full max-[760px]:max-h-[calc(100vh-var(--taskbar-height)-1rem)] ${raisedBorder}`}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex min-h-[1.8rem] items-center justify-between border-b border-b-[var(--win95-shadow)] bg-[linear-gradient(90deg,var(--win95-title-start)_0%,var(--win95-title-end)_100%)] px-[0.45rem] py-[0.2rem] pr-[0.32rem]">
                    <span className="select-none text-[0.84rem] font-bold tracking-[0.02em] text-white">TRACKS</span>
                    <button
                        type="button"
                        className={`h-[1.15rem] w-[1.2rem] cursor-pointer bg-[var(--win95-face)] text-[0.76rem] font-bold leading-none text-black active:pt-px active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] ${raisedBorder}`}
                        onClick={onClose}
                        aria-label="Close window"
                    >
                        X
                    </button>
                </header>

                <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-[#c0c0c0] p-[0.9rem] text-black">
                    <p className="m-0 text-center text-[1.4rem] font-black italic tracking-[0.01em]">Tracks</p>
                    <p className="m-[0.35rem_0_0.85rem] text-center text-[0.84rem]">Descriptions and guidelines for each competition track.</p>

                    <div className="mt-3 grid gap-4">
                        <section className="rounded-none border border-solid bg-[#d8d8d8] p-[0.55rem] [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] shadow-[inset_1px_1px_0_#f5f5f5,inset_-1px_-1px_0_#8d8d8d]">
                            <p className="m-0 text-[1rem] font-bold">AI Agents Track</p>
                            <p className="mt-1 m-0 text-[0.9rem]">Prizes: RocketBook Digital Notebooks</p>
                            <p className="mt-1 text-[0.9rem]">Guidelines: Build an interesting and helpful AI Agent that automates something boring or provides clear value. Examples include autonomous agents that complete multi-step tasks, LLM-powered tool use, and multi-agent systems where agents collaborate or compete. Creative, impactful applications of AI Agents will be rated highly.</p>
                        </section>

                        <section className="rounded-none border border-solid bg-[#d8d8d8] p-[0.55rem] [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] shadow-[inset_1px_1px_0_#f5f5f5,inset_-1px_-1px_0_#8d8d8d]">
                            <p className="m-0 text-[1rem] font-bold">Computer Vision Track</p>
                            <p className="mt-1 m-0 text-[0.9rem]">Prizes: HD Drones</p>
                            <p className="mt-1 text-[0.9rem]">Guidelines: Create something unique and interesting with Computer Vision — custom CV models, OpenCV projects, interactive CV experiences, or other creative applications. Projects with unique, well-executed CV work will be rated highly.</p>
                        </section>

                        <section className="rounded-none border border-solid bg-[#d8d8d8] p-[0.55rem] [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] shadow-[inset_1px_1px_0_#f5f5f5,inset_-1px_-1px_0_#8d8d8d]">
                            <p className="m-0 text-[1rem] font-bold">Entertainment Track</p>
                            <p className="mt-1 m-0 text-[0.9rem]">Prizes: Karaoke Machine</p>
                            <p className="mt-1 text-[0.9rem]">Guidelines: Apply AI/ML to something fun — games, media generation, interactive experiences, or other entertaining projects. Creativity and enjoyable user experiences will be rated highly.</p>
                        </section>

                        <section className="rounded-none border border-solid bg-[#d8d8d8] p-[0.55rem] [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] shadow-[inset_1px_1px_0_#f5f5f5,inset_-1px_-1px_0_#8d8d8d]">
                            <p className="m-0 text-[1rem] font-bold">Data Science and Ethics</p>
                            <p className="mt-1 m-0 text-[0.9rem]">About: Hosted by ACM-W at OSU, this track focuses on data science, predictive modeling, and ethical responsibility.</p>
                            <p className="mt-1 text-[0.9rem]">Prizes: Kindle, Keyboard, Mouse, Claude Credits</p>
                            <p className="mt-1 text-[0.9rem]">Guidelines: Develop projects that demonstrate strong data science practice along with thoughtful consideration of ethical implications. Submissions should balance model quality, interpretability, and ethical awareness.</p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
