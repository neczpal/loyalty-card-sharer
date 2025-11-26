import {ModalWindow} from "../components/ModalWindow";
import {BarCode} from "../components/BarCode";
import {BaseCopyField} from "../components/BaseCopyField.tsx";
import {LayoutModal} from "../layouts/LayoutModal.tsx";

export function ExportShareModalView({shareUrl, onClose}: {
    shareUrl: string;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose}>
            <LayoutModal header="Share cards">
                <div className="self-center">
                    <BarCode
                        code={{
                            type: "qr",
                            value: shareUrl
                        }}
                        size="large"
                    />
                </div>
                <BaseCopyField copyText={shareUrl} />
            </LayoutModal>
        </ModalWindow>
    );
}
