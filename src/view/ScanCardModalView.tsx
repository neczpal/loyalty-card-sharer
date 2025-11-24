import type {CardDto} from "../data/CardDto.ts";
import {BarCode} from "../components/BarCode.tsx";
import {ModalWindow} from "../components/ModalWindow.tsx";

export function ScanCardModalView({card, onClose}: {
    card: CardDto;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose} color={card.color}>
            <h2 className="text-3xl font-bold mb-4 text-center">{card.name}</h2>
            <p className="text-lg font-mono text-center">Kártya kódja: {card.code.value}</p>
            <BarCode code={card.code} />
        </ModalWindow>
    );
}