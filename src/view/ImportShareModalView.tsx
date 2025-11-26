import {ModalWindow} from "../components/ModalWindow";
import {LayoutModal} from "../layouts/LayoutModal.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";

export function ImportShareModalView({
    onOverride,
    onAddAll,
    onCancel
}: {
    onOverride: () => void;
    onAddAll: () => void;
    onCancel: () => void;
}) {

    return (
        <ModalWindow onClose={onCancel} size="dialog">
            <LayoutModal header="Import shared cards">
                    <p className="text-center mb-4">Do you want to import the shared card data?</p>

                    <div className="flex gap-4 justify-center">
                        <BaseIconButton
                            onClick={onOverride}
                            text="Override"
                            iconName="arrow_circle_up"
                            variant="danger"
                        />
                        <BaseIconButton
                            onClick={onAddAll}
                            text="Add All"
                            iconName="add_circle"
                            variant="primary"
                        />
                        <BaseIconButton
                            onClick={onCancel}
                            text="Cancel"
                            iconName="cancel"
                        />
                    </div>
            </LayoutModal>
        </ModalWindow>
    );
}
