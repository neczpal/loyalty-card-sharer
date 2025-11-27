import type {CardDto} from "../data/CardDto.ts";
import {BaseIconButton} from "./BaseIconButton.tsx";

/**
 * A tile component for displaying a loyalty card.
 * @param card The card to display.
 * @param isEditModeOn Whether the edit mode is on.
 * @param onSelect A callback function that is called when the tile is selected.
 * @param onEdit A callback function that is called when the edit button is clicked.
 * @param onDelete A callback function that is called when the delete button is clicked.
 */
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
            className={`${isEditModeOn ? "cursor-move" : "cursor-pointer"} relative p-8 rounded-xl shadow-lg
             transform transition-all duration-300 text-white 
             hover:scale-105 hover:shadow-xl lg:hover:scale-105 lg:hover:shadow-xl`}
            style={{backgroundColor: card.color}}
        >
            {isEditModeOn && (
                <div
                    className="absolute top-0 right-2 text-white/90 text-2xl select-none"
                >
                    ≡
                </div>
            )}
            <div className="flex justify-end items-center flex-wrap gap-2">
                <h3 className="text-xl flex-grow truncate min-w-0">{card.name}</h3>
                {isEditModeOn &&
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <BaseIconButton
                            onClick={() => onEdit(card)}
                            iconName="edit"
                            text=""
                            variant="primary"
                        />
                        <BaseIconButton
                            onClick={() => onDelete(card)}
                            iconName="delete"
                            text=""
                            variant="danger"
                        />
                    </div>
                }
            </div>
        </div>
    );
}
