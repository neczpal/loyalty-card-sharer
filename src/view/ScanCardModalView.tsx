import type {CardDto} from "../data/CardDto.ts";
import {BarCode} from "../components/BarCode.tsx";
import {ModalWindow} from "../components/ModalWindow.tsx";
import {BaseCopyField} from "../components/BaseCopyField.tsx";
import {LayoutModal} from "../layouts/LayoutModal.tsx";

export function ScanCardModalView({card, onClose}: {
    card: CardDto;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose} color={card.color}>
            <LayoutModal header={card.name}>
                <BarCode code={card.code}/>
                <span className="text-lg text-center mt-4">Card Code:</span>
                <BaseCopyField copyText={card.code.value}/>
            </LayoutModal>
        </ModalWindow>
    );
}
