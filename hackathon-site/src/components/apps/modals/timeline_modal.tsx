"use client";

type TimelineModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type TimelineEntry = {
    title: string;
    details?: string;
};

const TIMELINE_ENTRIES: TimelineEntry[] = [
    { title: "Saturday, May 16 - 12:00 PM: KEC opens" },
    { title: "Saturday, May 16 - 1:00 PM: Opening ceremony" },
    { title: "Saturday, May 16 - 2:00 PM: Hacking starts!" },
    { title: "Saturday, May 16 - 3:00 PM: ACM-W workshop" },
    {
        title: "Saturday, May 16 - 4:00 PM to 7:00 PM: AI Club workshops (hourly)",
        details: "Each workshop starts at the top of the hour and runs for 20 minutes.",
    },
    {
        title: "Wednesday, May 20 - 6:00 PM to 8:00 PM: Workshops, networking, and office hours",
        details: "Location: Owen 106.",
    },
    { title: "Friday, May 22 - 2:00 PM: Hacking ends" },
    {
        title: "Saturday, May 23 - 12:00 PM to 2:00 PM: Closing ceremony",
        details: "Location: LInC.",
    },
];

export default function TimelineModal({ isOpen, onClose }: TimelineModalProps) {
    const raisedBorder = "border border-solid [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)]";

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[35] grid place-items-center bg-black/20 p-[0.9rem] max-[760px]:items-start max-[760px]:p-[0.45rem] max-[760px]:pb-[calc(var(--taskbar-height)+0.45rem)]"
            role="dialog"
            aria-modal="true"
            aria-label="Timeline"
            onClick={onClose}
        >
            <section
                className={`flex w-[min(48rem,calc(100vw-1rem))] min-h-[24rem] max-h-[calc(100vh-var(--taskbar-height)-1.2rem)] flex-col overflow-hidden bg-[var(--win95-face)] shadow-[inset_1px_1px_0_var(--win95-light),inset_-1px_-1px_0_var(--win95-shadow),2px_2px_0_#000] max-[760px]:min-h-[20rem] max-[760px]:w-full max-[760px]:max-h-[calc(100vh-var(--taskbar-height)-1rem)] ${raisedBorder}`}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex min-h-[1.8rem] items-center justify-between border-b border-b-[var(--win95-shadow)] bg-[linear-gradient(90deg,var(--win95-title-start)_0%,var(--win95-title-end)_100%)] px-[0.45rem] py-[0.2rem] pr-[0.32rem]">
                    <span className="select-none text-[0.84rem] font-bold tracking-[0.02em] text-white">HACKATHON TIMELINE</span>
                    <button
                        type="button"
                        className={`h-[1.15rem] w-[1.2rem] cursor-pointer bg-[var(--win95-face)] text-[0.76rem] font-bold leading-none text-black active:pt-px active:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)] ${raisedBorder}`}
                        onClick={onClose}
                        aria-label="Close window"
                    >
                        X
                    </button>
                </header>

                <div className="min-h-0 flex-1 overflow-auto bg-[#c0c0c0] p-[0.9rem] text-black">
                    <p className="m-0 text-center text-[1.4rem] font-black italic tracking-[0.01em]">Timeline</p>
                    <p className="m-[0.35rem_0_0.85rem] text-center text-[0.84rem]">
                        Everything happening from kickoff to closing ceremony.
                    </p>

                    <ol className="relative m-0 ml-[0.15rem] grid list-none gap-[0.65rem] border-l-2 border-l-[#4f4f4f] pl-[1.05rem]">
                        {TIMELINE_ENTRIES.map((entry) => (
                            <li
                                key={entry.title}
                                className="relative rounded-none border border-solid bg-[#d8d8d8] p-[0.55rem] [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] shadow-[inset_1px_1px_0_#f5f5f5,inset_-1px_-1px_0_#8d8d8d]"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute left-[-1.42rem] top-[0.78rem] h-[0.5rem] w-[0.5rem] rounded-none border border-black bg-[#f3c200]"
                                />
                                <p className="m-0 text-[0.86rem] font-bold leading-[1.33]">{entry.title}</p>
                                {entry.details ? <p className="m-[0.3rem_0_0] text-[0.8rem] leading-[1.33]">{entry.details}</p> : null}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}
