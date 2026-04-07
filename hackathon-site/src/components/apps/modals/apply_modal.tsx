"use client";

type ApplyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
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
                    
                </div>
            </section>
        </div>
    );
}