import {useState} from "react";
import {ModalWindow} from "../components/ModalWindow";
import {BarCode} from "../components/BarCode"; // adjust path if needed

export default function ExportShareModalView({shareUrl, onClose}: {
    shareUrl: string;
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error("Failed to copy:", e);
        }
    };

    return (
        <ModalWindow onClose={onClose} color="#fff">
            <div className="flex flex-col gap-4 p-6 text-black">

                <h2 className="text-xl font-bold mb-2">Share Your Cards</h2>

                <div className="flex gap-2 items-center">
                    <input
                        className="border px-3 py-2 flex-1 rounded"
                        type="text"
                        readOnly
                        value={shareUrl}
                    />
                    <button
                        className="px-3 py-2 rounded bg-blue-500 text-white"
                        onClick={handleCopy}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                <div className="mt-4 self-center">
                    <BarCode
                        code={{
                            type: "qr",
                            value: shareUrl
                        }}
                        size="large"
                    />
                </div>

            </div>
        </ModalWindow>
    );
}