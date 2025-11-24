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
            className="cursor-pointer p-6 rounded-xl shadow-lg
             transform transition-all duration-300
             hover:scale-105 hover:shadow-xl"
            style={{backgroundColor: card.color}}
        >
            <h3>{card.name}</h3>
            {isEditModeOn &&
                <div className="flex gap-2 mt-4">
                    <button
                        className="px-3 py-1 border rounded bg-white/70 hover:bg-white text-black"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(card);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="px-3 py-1 border rounded bg-red-600 hover:bg-red-700 text-white"
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