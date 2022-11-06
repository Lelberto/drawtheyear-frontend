import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ReactNode } from "react";

type ModalProps = {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
    visible?: boolean;
    onClose?: () => void;
};
export const Modal = ({
    header,
    content,
    footer,
    visible = false,
    onClose,
}: ModalProps) => {
    const modalClassName = classNames(
        {
            fixed: visible,
            hidden: !visible,
        },
        "top-0 bottom-0 left-0 right-0 z-50"
    );

    return (
        <div className={modalClassName} onClick={() => onClose && onClose()}>
            <div
                className="relative top-1/4 mx-32 border-gray-600 rounded-lg shadow-2xl bg-dark"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row-reverse px-5 py-2">
                    <button onClick={() => onClose && onClose()}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <div className="mx-5 space-y-10">
                    <div className="py-2">{header}</div>
                    <div className="py-2">{content}</div>
                    <div className="py-2">{footer}</div>
                </div>
            </div>
        </div>
    );
};
