import {ModalWindow} from "../components/ModalWindow.tsx";
import {ModalLayout} from "../layouts/ModalLayout.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";

/**
 * A dialog view for importing shared loyalty cards.
 * @param onOverride A callback function that is called when the user chooses to override their existing cards.
 * @param onAddAll A callback function that is called when the user chooses to add the shared cards to their existing cards.
 * @param onCancel A callback function that is called when the user cancels the import.
 */
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
            <ModalLayout header="Import shared cards">
                    <p className="text-center mb-4">You already have cards on this device what do you want to do?</p>

                    <div className="flex gap-4 justify-center">
                        <BaseIconButton
                            onClick={onOverride}
                            text="Override"
                            iconName="arrow_circle_up"
                            variant="danger"
                        />
                        <BaseIconButton
                            onClick={onAddAll}
                            text="Merge"
                            iconName="add_circle"
                            variant="primary"
                        />
                        <BaseIconButton
                            onClick={onCancel}
                            text="Cancel"
                            iconName="cancel"
                        />
                    </div>
            </ModalLayout>
        </ModalWindow>
    );
}
