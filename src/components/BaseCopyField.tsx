import {useState} from "react";
import {BaseToggleButton} from "./BaseToggleButton";
import {BaseIconButton} from "./BaseIconButton.tsx";

/**
 * Props for the BaseCopyField component.
 */
interface BaseCopyFieldProps {
    copyText: string;
    shareTitle?: string;
    shareText?: string;
    shareUrl?: string;
}

/**
 * A component for copying text to the clipboard and sharing it with url.
 * @param copyText The text to be copied.
 * @param shareTitle The title to be used when sharing.
 * @param shareText The text to be used when sharing.
 * @param shareUrl The URL to be used when sharing.
 */
export function BaseCopyField({copyText, shareTitle, shareText, shareUrl}: BaseCopyFieldProps) {
    const [copied, setCopied] = useState(false);

    const canShare = !!navigator && !!navigator.share && shareTitle && shareText;
    const canCopy = !!navigator && !!navigator.clipboard;

    const handleShare = async () => {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl || copyText,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

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
                className="border self-stretch text-center px-3 py-2 flex-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                type="text"
                readOnly
                value={copyText}
            />
            <div className="flex flex-row gap-2 items-center">
                {
                    canCopy &&
                    <BaseToggleButton
                        onClick={handleCopy}
                        toggled={copied}
                        onIconName="check"
                        offIconName="content_copy"
                        onText="Copied!"
                        offText="Copy"
                    />
                }
                {
                    canShare &&
                    <BaseIconButton
                        onClick={handleShare}
                        iconName="share"
                        text="Share"
                    />
                }
            </div>
        </div>
    );
}