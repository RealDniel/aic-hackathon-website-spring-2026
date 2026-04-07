type ApplyAppProps = {
    isOpen: boolean;
    onOpen: () => void;
};

export default function ApplyApp({ isOpen, onOpen }: ApplyAppProps) {

    return (
        <button
            id="container"
            type="button"
            aria-expanded={isOpen}
            onClick={onOpen}
            className="app relative flex items-center justify-center select-none bg-gray-900"
        >
            <span className="app-text text-5xl leading-none">-_-</span>
            <p className="app-text absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-2xl font-medium leading-none">
                APPLY
            </p>
        </button>
    );
}