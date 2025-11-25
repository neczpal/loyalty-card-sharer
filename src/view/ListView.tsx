import type {CardDto} from "../data/CardDto.ts";
import {Tile} from "../components/Tile.tsx";
import {useState, useMemo} from "react";
import { List, arrayMove } from "react-movable";


export function ListView({cards, onOpen, onEdit, onDelete, onShare, onReorder}: {
    cards: CardDto[];
    onOpen: (card: CardDto) => void;
    onEdit: (card?: CardDto) => void;
    onDelete: (card: CardDto) => void;
    onShare: () => void;
    onReorder: (cards: CardDto[]) => void;
}) {
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [search, setSearch] = useState("");

    const toggleEditMode = () => {
        const next = !isEditModeOn;
        if (next) setSearch("");
        setIsEditModeOn(next);
    };

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
            <List
                values={filteredCards}
                onChange={({ oldIndex, newIndex }) => {
                    const updated = arrayMove(filteredCards, oldIndex, newIndex);
                    onReorder(updated);
                }}
                renderList={({ children, props }) => (
                    <ul {...(isEditModeOn ? props : {})} className="flex flex-col gap-4 w-full">
                        {children}
                    </ul>
                )}
                renderItem={({ value: card, props }) => (
                    <li {...(isEditModeOn ? props : {})} key={card.id} className="list-none">
                        <Tile
                            card={card}
                            isEditModeOn={isEditModeOn}
                            onSelect={isEditModeOn ? () => {} : onOpen}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </li>
                )}
            />

            {isEditModeOn &&
                <div
                    className="cursor-pointer p-6 rounded-xl shadow-lg flex items-center justify-center
                               transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                               bg-gray-200 text-gray-700 text-3xl mt-4"
                    onClick={() => onEdit()}
                >
                    +
                </div>
            }

            {isEditModeOn &&
                <div
                    className="cursor-pointer p-6 rounded-xl shadow-lg flex items-center justify-center
                               transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                               bg-blue-200 text-blue-700 text-3xl mt-4"
                    onClick={() => onShare()}
                >
                    🔗
                </div>
            }

            <div className="flex justify-center items-center w-full">
                <span className="cursor-pointer"
                      onClick={toggleEditMode}>
                    Edit mode
                </span>
                {!isEditModeOn && cards.length > 4 && <>
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