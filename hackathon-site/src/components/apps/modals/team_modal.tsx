"use client";

type TeamModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
    const raisedBorder = "border border-solid [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)]";

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[35] grid place-items-center bg-black/20 p-[0.9rem] max-[760px]:items-start max-[760px]:p-[0.45rem] max-[760px]:pb-[calc(var(--taskbar-height)+0.45rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Team"
            onClick={onClose}
        >
            <section
                className={`flex w-[min(48rem,calc(100vw-1rem))] min-h-[26rem] max-h-[calc(100vh-var(--taskbar-height)-1.2rem)] flex-col overflow-hidden bg-[var(--win95-face)] shadow-[inset_1px_1px_0_var(--win95-light),inset_-1px_-1px_0_var(--win95-shadow),2px_2px_0_#000] max-[760px]:min-h-[20rem] max-[760px]:w-full max-[760px]:max-h-[calc(100vh-var(--taskbar-height)-1rem)] ${raisedBorder}`}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex min-h-[1.8rem] items-center justify-between border-b border-b-[var(--win95-shadow)] bg-[linear-gradient(90deg,var(--win95-title-start)_0%,var(--win95-title-end)_100%)] px-[0.45rem] py-[0.2rem] pr-[0.32rem]">
                    <span className="select-none text-[0.84rem] font-bold tracking-[0.02em] text-white">OUR TEAM</span>
                    <button
                        type="button"
                        className={`h-[1.15rem] w-[1.2rem] cursor-pointer bg-[var(--win95-face)] text-[0.76rem] font-bold leading-none text-black active:pt-px active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] ${raisedBorder}`}
                        onClick={onClose}
                        aria-label="Close window"
                    >
                        X
                    </button>
                </header>
                {/* Main body */}
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-auto bg-[#c0c0c0]">
                    <p className="m-5 text-center text-3xl font-bold italic">Our Team</p>
                    <p>Apply to our hackathon with the <span className="font-bold underline">APPLY</span> app above this one!</p>

                    <p className="my-5 font-bold italic">This hackathon is brought to you by the <a href="https://apps.ideal-logic.com/osusee?key=F3T9-25VWY_5878-CZ4R_0a27fcc4" className="not-italic font-bold text-blue-700 underline">AI Club</a> as well as ACM-W.</p>
                    <span className="m-5">AI Club is hosting this hackathon for two main reasons. The first of which is that we want to transition our club’s structure into one with larger events that have more reach across campus. This hackathon will serve as our first large event, and teach us about what goes into planning and execution of such events. It will allow us to make a memorable impression as our leadership shifts and goals change. Secondly, we want to provide students with a hands-on learning experience where they will be given the opportunity to work with new people, work on new things, and broaden their experience significantly. Hackathons are traditionally a great avenue for this, and with most of our leadership having participated in a multitude of hackathons previously, hosting one ourselves will be deeply rewarding and fun.</span>


                    <p className="mt-20">AI Club is also hiring new officers! If you&apos;re interested, click the link below:</p>
                    <a
                        href="https://forms.gle/JX3X8qhYYBon4aw67"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-blue-700 underline my-5"
                    >
                        I WANT TO BE AN AI CLUB OFFICER!
                    </a>
                    <p className="mt-4 text-center">
                        Join Our Discord for Live Updates and Announcements: <a href="https://discord.gg/jUAF8hMA" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700 underline">https://discord.gg/jUAF8hMA</a>
                    </p>
                </div>
            </section>
        </div>
    );
}