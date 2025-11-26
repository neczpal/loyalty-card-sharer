import type {CardDto} from "../data/CardDto.ts";
import {Tile} from "../components/Tile.tsx";
import {useState, useMemo} from "react";
import {List, arrayMove} from "react-movable";
import {LayoutDefault} from "../layouts/LayoutDefault.tsx";
import {BaseSearchField} from "../components/BaseSearchField.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";
import {BaseToggleButton} from "../components/BaseToggleButton.tsx";

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

    const footer = <div className="flex justify-center items-center w-full gap-4">
        {isEditModeOn &&
            <BaseIconButton
                onClick={() => onEdit()}
                iconName="add_card"
                text=""
            />
        }

        {isEditModeOn &&
            <BaseIconButton
                onClick={() => onShare()}
                iconName="share"
                text=""
            />
        }
        <BaseToggleButton
            onClick={toggleEditMode}
            toggled={isEditModeOn}
            onIconName="close"
            offIconName="dashboard_customize"
            onText=""
            offText=""
        />
        {!isEditModeOn && cards.length > 4 && <BaseSearchField value={search} onChange={setSearch} />}
    </div>;

    return (
        <LayoutDefault footer={footer}>
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
        </LayoutDefault>
    );
}
