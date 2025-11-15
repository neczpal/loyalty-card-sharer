import type {CardDto} from "./data/CardDto.ts";
import {Tile} from "./Tile.tsx";

export function TileView({cards, onSelect}: {
    cards: CardDto[];
    onSelect: (card: CardDto) => void;
}) {
    return (
        <>
            <div className="flex justify-center items-center w-full">
                <h1> 𝄃𝄃𝄂𝄂「Cards」𝄀𝄁𝄃𝄂𝄂𝄃 </h1>
            </div>
            <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
                {
                    cards.map(card =>
                        <Tile
                            card={card}
                            onSelect={onSelect}
                        />)
                }
            </div>

            <div className="flex justify-center items-center w-full">
                <span>Edit mode</span>
                <input type="text" placeholder="Search" />
                <button>🔎</button>
            </div>
        </>
    );
}