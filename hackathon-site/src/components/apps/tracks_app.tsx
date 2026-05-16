import Image from "next/image";

type TracksAppProps = {
    isOpen: boolean;
    onOpen: () => void;
};

export default function TracksApp({ isOpen, onOpen }: TracksAppProps) {

    return (
        <button
            type="button"
            aria-expanded={isOpen}
            data-open={isOpen ? "true" : "false"}
            onClick={onOpen}
            className="group fixed left-[2.25rem] top-[35.8rem] z-[24] grid w-[clamp(7.8rem,16vw,11.2rem)] cursor-pointer content-start justify-items-center gap-[0.8rem] border border-transparent bg-transparent px-[0.42rem] py-[0.63rem] transition-colors duration-100 hover:border-[#cfd5df]/55 hover:bg-[#b7bcc8]/28 focus-visible:border-[#d5dbe5]/65 focus-visible:bg-[#b7bcc8]/32 max-[760px]:top-[30.9rem]"
        >
            <span
                className="relative h-[clamp(5.025rem,10.2vw,6.675rem)] w-[clamp(5.025rem,10.2vw,6.675rem)] select-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.42)]"
                aria-hidden="true"
            >
                <Image
                    src="/assets/icons/network.png"
                    alt=""
                    fill
                    sizes="(max-width: 760px) 72px, 96px"
                    className="object-contain [image-rendering:pixelated] scale-[2]"
                    priority
                />
            </span>
            <p className="m-0 select-none text-[clamp(1.2rem,2.55vw,1.5rem)] leading-none tracking-[0.02em] text-white [text-shadow:0_2px_0_#000,0_0_10px_rgba(255,255,255,0.2)] group-hover:text-[#f6fbff] group-focus-visible:text-[#f6fbff]">
                TRACKS
            </p>
        </button>
    );
}
