import {BaseIcon} from './BaseIcon';

/**
 * Props for the BaseIconButton component.
 */
type IconButtonProps = {
    onClick: () => void,
    text: string,
    iconName?: string,
    variant?: 'primary' | 'danger' | 'default',
    disabled?: boolean,
}

/**
 * A base icon button component.
 * @param onClick A callback function that is called when the button is clicked.
 * @param text The text to display on the button.
 * @param iconName The name of the material icon to display on the button.
 * @param variant The variant of the button.
 * @param disabled Whether the button is disabled.
 */
export function BaseIconButton({onClick, text, iconName, variant = 'default', disabled = false}: IconButtonProps) {

    const baseClasses = "flex g-1 items-center px-4 py-2 rounded-md";

    let variantClasses = "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
    switch (variant) {
        case 'primary':
            variantClasses = "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";
            break;
        case 'danger':
            variantClasses = "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700";
            break;
    }

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return <button className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
                   type="button"
                   onClick={onClick}
                   disabled={disabled}>
        {iconName && <BaseIcon iconName={iconName}/>}
        {text && (
            <span className="ml-1">{text}</span>
        )}
    </button>
}
