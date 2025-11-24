import type {CardDto} from "../data/CardDto.ts";
import {Tile} from "../components/Tile.tsx";
import {useState, useMemo} from "react";


export function TileView({cards, onOpen, onEdit, onDelete, onShare}: {
    cards: CardDto[];
    onOpen: (card: CardDto) => void;
    onEdit: (card?: CardDto) => void;
    onDelete: (card: CardDto) => void;
    onShare: () => void;
}) {
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [search, setSearch] = useState("");

    const filteredCards = useMemo(() => {
        return cards.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [cards, search]);

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <h1>「Cards」</h1>
            </div>
            <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
                {
                    filteredCards.map(card =>
                        <Tile
                            key={card.id}
                            card={card}
                            isEditModeOn={isEditModeOn}
                            onSelect={onOpen}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />)
                }
                {isEditModeOn &&
                    <div
                        className="cursor-pointer p-6 rounded-xl shadow-lg flex items-center justify-center
                                   transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                                   bg-gray-200 text-gray-700 text-3xl"
                        onClick={() => onEdit()}
                    >
                        +
                    </div>
                }
                {isEditModeOn &&
                    <div
                        className="cursor-pointer p-6 rounded-xl shadow-lg flex items-center justify-center
                                   transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                                   bg-blue-200 text-blue-700 text-3xl"
                        onClick={() => onShare()}
                    >
                        🔗
                    </div>
                }
            </div>

            <div className="flex justify-center items-center w-full">
                <span className="cursor-pointer"
                      onClick={() => setIsEditModeOn(prevState => !prevState)}>
                    Edit mode
                </span>
                {cards.length > 4 && <>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search"
                    />
                    <button onClick={() => setSearch("")}>
                        {search.length > 0 ? "❌" : "🔎"}
                    </button>
                </>
                }
            </div>
        </>
    );
}