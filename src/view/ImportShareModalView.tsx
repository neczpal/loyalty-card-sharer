import {ModalWindow} from "../components/ModalWindow";

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
        <ModalWindow onClose={onCancel} color="#fff">
            <div className="flex flex-col p-4 gap-4 text-black">
                <h2 className="text-xl font-bold">Shared Cards Detected</h2>
                <p>Do you want to import the shared card data?</p>

                <div className="flex gap-4 justify-center">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={onOverride}
                    >
                        Override
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={onAddAll}
                    >
                        Add All
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </ModalWindow>
    );
}
