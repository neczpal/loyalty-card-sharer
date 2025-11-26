import {useState} from "react";
import {BaseIconButton} from "./BaseIconButton.tsx";

export function ModalWindow({children, color, onClose, size = 'modal'}: {
    children: React.ReactNode;
    color?: string;
    onClose: () => void;
    size?: 'modal' | 'dialog';
}) {
    const [closing, setClosing] = useState(false);


    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 150); // match animation duration
    };

    const modalStyle = color ? { backgroundColor: color, color: "white" } : {};

    const sizeClasses = size === 'modal'
        ? 'h-[80vh]'
        : 'h-fit max-h-[80vh]';

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
             onClick={handleClose}
        >
            <div className={`w-[80vw] max-w-[512px] ${sizeClasses} rounded-2xl shadow-2xl flip-in relative overflow-auto
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                ${closing ? "flip-out" : "flip-in"}
            `}
                 style={modalStyle}
                 onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4">
                    <BaseIconButton onClick={handleClose} iconName="close" text="" />
                </div>
                <div className="flex flex-col h-full gap-4 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
