import {ModalWindow} from "../components/ModalWindow";
import {BarCode} from "../components/BarCode";
import {BaseUrlCopyField} from "../components/BaseUrlCopyField.tsx";
import {LayoutModal} from "../layouts/LayoutModal.tsx";

export function ExportShareModalView({shareUrl, onClose}: {
    shareUrl: string;
    onClose: () => void;
}) {
    const header = <h2 className="text-xl font-bold">Share Your Cards</h2>;

    return (
        <ModalWindow onClose={onClose}>
            <LayoutModal header={header}>
                <BaseUrlCopyField url={shareUrl} />
                <div className="mt-4 self-center">
                    <BarCode
                        code={{
                            type: "qr",
                            value: shareUrl
                        }}
                        size="large"
                    />
                </div>
            </LayoutModal>
        </ModalWindow>
    );
}
