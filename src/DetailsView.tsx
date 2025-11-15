import type {CardDto} from "./data/CardDto.ts";

export function DetailsView({card, onClose}: {
    card: CardDto;
    onClose: () => void;
}) {

    const codeImg = `https://barcodeapi.org/api/${card.type}/${card.code}`;

    return (
        <div className="
            fixed inset-0
            bg-black/50
            flex items-center justify-center
            z-50
        ">
            <div className="
                w-[90vw] h-[90vh]
                rounded-2xl shadow-2xl p-8
                flipIn
                transform-gpu
                relative
                "
                 style={{ backgroundColor: card.color }}
            >

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl"
                >
                    ✖
                </button>

                <h2 className="text-3xl font-bold mb-4">{card.name}</h2>

                <div className="flex flex-col gap-2">
                    <span className="text-lg font-mono">Code: {card.code}</span>
                </div>
                <div>
                    <img src={codeImg} />
                </div>
            </div>
        </div>
    );
}