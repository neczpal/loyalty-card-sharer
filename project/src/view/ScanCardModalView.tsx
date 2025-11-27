import type {CardDto} from "../data/CardDto.ts";
import {BarCode} from "../components/BarCode.tsx";
import {ModalWindow} from "../components/ModalWindow.tsx";
import {BaseCopyField} from "../components/BaseCopyField.tsx";
import {ModalLayout} from "../layouts/ModalLayout.tsx";
import cardShareService from "../services/CardShareService.ts";

/**
 * A modal view for displaying a loyalty card's barcode.
 * @param card The card to display.
 * @param onClose A callback function that is called when the modal is closed.
 */
export function ScanCardModalView({card, onClose}: {
    card: CardDto;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose} color={card.color}>
            <ModalLayout header={card.name}>
                <BarCode code={card.code}/>
                <span className="text-lg text-center mt-4">Card Code:</span>
                <BaseCopyField
                    copyText={card.code.value}
                    shareTitle={`Sharing card: ${card.name}`}
                    shareText={`Here is a link to my ${card.name} card.`}
                    shareUrl={cardShareService.createShareUrl(card)}
                />
            </ModalLayout>
        </ModalWindow>
    );
}
