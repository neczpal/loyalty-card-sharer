import {BaseIcon} from './BaseIcon';

type IconButtonProps = {
    onClick: () => void,
    text: string,
    iconName?: string,
    variant?: 'primary' | 'danger' | 'cancel' | 'default',
    disabled?: boolean,
}

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
