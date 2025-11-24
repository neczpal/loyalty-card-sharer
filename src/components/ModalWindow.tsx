import {useState} from "react";

export function ModalWindow({children, color, onClose}: {
    children: React.ReactNode;
    color: string;
    onClose: () => void;
}) {
    const [closing, setClosing] = useState(false);


    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 150); // match animation duration
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
             onClick={handleClose}
        >
            <div className={`w-[75vw] h-[75vh] rounded-2xl shadow-2xl flip-in relative overflow-auto
                ${closing ? "flip-out" : "flip-in"}
            `}
                 style={{ backgroundColor: color }}
                 onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}