import type {CardDto} from "../data/CardDto.ts";
import {Tile} from "../components/Tile.tsx";
import {useState, useMemo} from "react";
import {List, arrayMove} from "react-movable";
import {DefaultLayout} from "../layouts/DefaultLayout.tsx";
import {BaseSearchField} from "../components/BaseSearchField.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";
import {BaseToggleButton} from "../components/BaseToggleButton.tsx";

/**
 * A view that displays a list of loyalty cards.
 * @param cards The list of cards to display.
 * @param onOpen A callback function that is called when a card is opened.
 * @param onEdit A callback function that is called when a card is edited.
 * @param onDelete A callback function that is called when a card is deleted.
 * @param onShareAll A callback function that is called when the share button is clicked.
 * @param onReorder A callback function that is called when the list of cards is reordered.
 */
export function ListView({cards, onOpen, onEdit, onDelete, onShareAll, onReorder}: {
    cards: CardDto[];
    onOpen: (card: CardDto) => void;
    onEdit: (card?: CardDto) => void;
    onDelete: (card: CardDto) => void;
    onShareAll: () => void;
    onReorder: (cards: CardDto[]) => void;
}) {
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [search, setSearch] = useState("");

    const showSearch = !isEditModeOn && cards.length > 4;

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

    const footer = <div className="flex justify-center items-center w-full gap-4">
        {isEditModeOn &&
            <BaseIconButton
                onClick={() => onEdit()}
                iconName="add_card"
                text="Add"
                variant="primary"
            />
        }

        {isEditModeOn &&
            <BaseIconButton
                onClick={() => onShareAll()}
                iconName="share"
                text="Share"
            />
        }
        <BaseToggleButton
            onClick={toggleEditMode}
            toggled={isEditModeOn}
            onIconName="done"
            offIconName="dashboard_customize"
            onText="Done"
            offText="Customize"
        />
        {showSearch && <BaseSearchField value={search} onChange={setSearch} />}
    </div>;

    if (cards.length === 0) {
        return (
            <DefaultLayout>
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-4">
                    <h2 className="text-3xl font-semibold">Your card collection is empty</h2>
                    <p className="text-gray-500">Get started by adding your first loyalty card.</p>
                    <BaseIconButton
                        onClick={() => onEdit()}
                        iconName="add_card"
                        text="Add Card"
                        variant="primary"
                    />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout footer={footer}>
            {filteredCards.length > 0 ? (
                <List
                    values={filteredCards}
                    onChange={({oldIndex, newIndex}) => {
                        const updated = arrayMove(filteredCards, oldIndex, newIndex);
                        onReorder(updated);
                    }}
                    renderList={({children, props}) => (
                        <ul {...(isEditModeOn ? props : {})} className="flex flex-col gap-4 w-full p-4">
                            {children}
                        </ul>
                    )}
                    renderItem={({value: card, props}) => (
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
            ) : (
                <div className="flex flex-col items-center justify-start h-full pt-16 text-center gap-2">
                    <p className="text-lg font-semibold">No results</p>
                    <p className="text-gray-500">No cards found matching "{search}".</p>
                </div>
            )}
        </DefaultLayout>
    );
}
