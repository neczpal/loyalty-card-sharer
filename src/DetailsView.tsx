import type {CardDto} from "./data/CardDto.ts";
import {useState} from "react";

export function DetailsView({card, onClose}: {
    card: CardDto;
    onClose: () => void;
}) {
    const [closing, setClosing] = useState(false);

    const codeImg = `https://barcodeapi.org/api/${card.type}/${card.code}`;
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 150); // match animation duration
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
             onClick={handleClose}
        >
            <div className={`w-[70vw] h-[80vh] rounded-2xl shadow-2xl flip-in relative
                ${
                    closing ? "flip-out" : "flip-in"
                }
            `}
                 style={{ backgroundColor: card.color }}
            >
                <h2 className="text-3xl font-bold mb-4 text-center">{card.name}</h2>
                <p className="text-lg font-mono text-center">{card.code}</p>
                <div className="flex flex-col justify-center bg-white py-2 mb-4 aspect-square">
                    <img className="block w-full" src={codeImg} alt={card.name} />
                </div>

            </div>
        </div>
    );
}