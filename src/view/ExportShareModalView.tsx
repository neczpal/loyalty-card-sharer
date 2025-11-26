import {ModalWindow} from "../components/ModalWindow";
import {BarCode} from "../components/BarCode";
import {BaseUrlCopyField} from "../components/BaseUrlCopyField.tsx";
import {LayoutModal} from "../layouts/LayoutModal.tsx";

export function ExportShareModalView({shareUrl, onClose}: {
    shareUrl: string;
    onClose: () => void;
}) {
    return (
        <ModalWindow onClose={onClose}>
            <LayoutModal header="Share Your Cards">
                <div className="self-center">
                    <BarCode
                        code={{
                            type: "qr",
                            value: shareUrl
                        }}
                        size="large"
                    />
                </div>
                <BaseUrlCopyField url={shareUrl} />
            </LayoutModal>
        </ModalWindow>
    );
}
