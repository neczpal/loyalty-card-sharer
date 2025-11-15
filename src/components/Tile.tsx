import type {CardDto} from "../data/CardDto.ts";

export function Tile({card, onSelect} :{
    card: CardDto,
    onSelect: (card: CardDto) => void
}) {
  return (
    <div
        onClick={() => onSelect(card)}
        className="cursor-pointer p-6 rounded-xl shadow-lg
             transform transition-all duration-300
             hover:scale-105 hover:shadow-xl"
        style={{ backgroundColor: card.color }}
    >
        <h3>{card.name}</h3>
    </div>
  );
}