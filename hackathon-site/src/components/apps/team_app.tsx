type TeamAppProps = {
    isOpen: boolean;
    onOpen: () => void;
};

export default function TeamApp({ isOpen, onOpen }: TeamAppProps) {

    return (
        <button
            type="button"
            aria-expanded={isOpen}
            data-open={isOpen ? "true" : "false"}
            onClick={onOpen}
            className="group fixed left-[2.25rem] top-[2.25rem] grid w-[clamp(8.85rem,18.3vw,12.75rem)] cursor-pointer content-start justify-items-center gap-[0.87rem] border-0 bg-transparent px-[0.48rem] py-[0.63rem]"
        >
            <span
                className="grid h-[clamp(5.025rem,10.2vw,6.675rem)] w-[clamp(5.025rem,10.2vw,6.675rem)] place-items-center border border-solid bg-[var(--win95-face)] [font-family:'Lucida_Console','Courier_New',monospace] text-[clamp(1.77rem,3.675vw,2.43rem)] leading-none text-black select-none [border-color:var(--win95-light)_var(--win95-dark)_var(--win95-dark)_var(--win95-light)] group-hover:outline group-hover:outline-1 group-hover:outline-dotted group-hover:outline-white group-hover:outline-offset-2 group-focus-visible:outline group-focus-visible:outline-1 group-focus-visible:outline-dotted group-focus-visible:outline-white group-focus-visible:outline-offset-2 group-data-[open=true]:pt-px group-data-[open=true]:[border-color:var(--win95-dark)_var(--win95-light)_var(--win95-light)_var(--win95-dark)]"
                aria-hidden="true"
            >
                -_-
            </span>
            <p className="m-0 select-none text-[clamp(1.35rem,2.775vw,1.65rem)] leading-none tracking-[0.02em] text-white [text-shadow:1px_1px_0_#000]">
                TEAM
            </p>
        </button>
    );
}
