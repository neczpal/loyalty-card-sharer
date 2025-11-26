import type {CardDto} from "../data/CardDto.ts";

export function Tile({card, isEditModeOn, onSelect, onEdit, onDelete}: {
    card: CardDto,
    isEditModeOn: boolean,
    onSelect: (card: CardDto) => void,
    onEdit: (card: CardDto) => void,
    onDelete: (card: CardDto) => void
}) {
    return (
        <div
            onClick={() => onSelect(card)}
            className={`${isEditModeOn ? "cursor-move" : "cursor-pointer"} relative p-6 rounded-xl shadow-lg
             transform transition-all duration-300 text-white
             hover:scale-105 hover:shadow-xl`}
            style={{backgroundColor: card.color}}
        >
            {isEditModeOn && (
                <div
                    className="absolute top-0 right-2 text-black/70 text-xl select-none"
                >
                    ≡
                </div>
            )}
            <h3>{card.name}</h3>
            {isEditModeOn &&
                <div className="flex gap-2 mt-4">
                    <button
                        className="cursor-pointer px-3 py-1 border rounded bg-white/70 hover:bg-white text-black"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(card);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="cursor-pointer px-3 py-1 border rounded bg-red-600 hover:bg-red-700 text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(card);
                        }}
                    >
                        Delete
                    </button>
                </div>
            }
        </div>
    );
}