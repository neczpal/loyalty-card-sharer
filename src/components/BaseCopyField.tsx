import { useState } from "react";
import { BaseToggleButton } from "./BaseToggleButton";

interface BaseCopyFieldProps {
    copyText: string;
}

export function BaseCopyField({ copyText }: BaseCopyFieldProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(copyText);
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
        } catch (e) {
            console.error("Failed to copy:", e);
        }
    };

    return (
        <div className="flex flex-col gap-2 items-center">
            <input
                className="border px-3 py-2 flex-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                type="text"
                readOnly
                value={copyText}
            />
            <BaseToggleButton
                onClick={handleCopy}
                toggled={copied}
                onIconName="check"
                offIconName="content_copy"
                onText="Copied!"
                offText="Copy"
            />
        </div>
    );
}