import type {CardDto} from "../data/CardDto.ts";
import {Tile} from "../components/Tile.tsx";
import {useState} from "react";


export function TileView({cards, onOpen, onEdit, onDelete}: {
    cards: CardDto[];
    onOpen: (card: CardDto) => void;
    onEdit: (card: CardDto) => void;
    onDelete: (card: CardDto) => void;
}) {
    const [isEditModeOn, setIsEditModeOn] = useState(false);

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <h1>「Cards」</h1>
            </div>
            <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
                {
                    cards.map(card =>
                        <Tile
                            key={card.id}
                            card={card}
                            isEditModeOn={isEditModeOn}
                            onSelect={onOpen}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />)
                }
            </div>

            <div className="flex justify-center items-center w-full">
                <span className="cursor-pointer"
                      onClick={() => setIsEditModeOn(prevState => !prevState)}>
                    Edit mode
                </span>
                <input type="text" placeholder="Search" />
                <button>🔎</button>
            </div>
        </>
    );
}