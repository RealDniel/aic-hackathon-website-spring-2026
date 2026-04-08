type ApplyAppProps = {
    isOpen: boolean;
    onOpen: () => void;
};

export default function ApplyApp({ isOpen, onOpen }: ApplyAppProps) {

    return (
        <button
            type="button"
            aria-expanded={isOpen}
            data-open={isOpen ? "true" : "false"}
            onClick={onOpen}
            className="group fixed left-[2.25rem] top-[2.25rem] z-30 grid w-[clamp(4.75rem,10vw,6.8rem)] cursor-pointer content-start justify-items-center gap-[0.45rem] border-0 bg-transparent px-[0.25rem] py-[0.35rem]"
        >
            <span
                className="grid h-[clamp(2.7rem,5.4vw,3.4rem)] w-[clamp(2.7rem,5.4vw,3.4rem)] place-items-center border border-solid bg-[var(--win95-face)] [font-family:'Lucida_Console','Courier_New',monospace] text-[clamp(1rem,2vw,1.25rem)] leading-none text-black select-none [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] [text-shadow:0_0_1px_rgba(175,255,255,0.75),0_0_8px_rgba(0,255,255,0.18)] group-hover:outline group-hover:outline-1 group-hover:outline-dotted group-hover:outline-white group-hover:outline-offset-2 group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-dotted group-focus-visible:outline-white group-focus-visible:outline-offset-2 group-data-[open=true]:pt-px group-data-[open=true]:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)]"
                aria-hidden="true"
            >
                -_-
            </span>
            <p className="m-0 select-none text-[clamp(0.72rem,1.5vw,0.86rem)] leading-none tracking-[0.02em] text-white [text-shadow:1px_1px_0_#000]">
                APPLY
            </p>
        </button>
    );
}
