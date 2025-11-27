import {ModalWindow} from "../components/ModalWindow.tsx";
import {BarCode} from "../components/BarCode.tsx";
import {BaseCopyField} from "../components/BaseCopyField.tsx";
import {ModalLayout} from "../layouts/ModalLayout.tsx";

/**
 * A modal view for exporting and sharing all the loyalty cards.
 * @param shareAllUrl The URL to be shared.
 * @param onClose A callback function that is called when the modal is closed.
 */
export function ExportShareModalView({shareAllUrl, onClose}: {
    shareAllUrl: string;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose}>
            <ModalLayout header="Share cards">
                <div className="self-center">
                    <BarCode
                        code={{
                            type: "qr",
                            value: shareAllUrl
                        }}
                        size="large"
                    />
                </div>
                <BaseCopyField copyText={shareAllUrl}
                               shareTitle="Share Loyalty Cards"
                               shareText="Here is a link to my shared loyalty cards."/>
            </ModalLayout>
        </ModalWindow>
    );
}
