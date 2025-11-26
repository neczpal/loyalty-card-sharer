import { BaseIcon } from './BaseIcon';

type IconButtonProps = {
    onClick: () => void,
    text: string,
    iconName?: string,
    variant?: 'primary' | 'danger' | 'cancel' | 'default',
}

export function BaseIconButton({onClick, text, iconName, variant = 'default'}: IconButtonProps) {

    const baseClasses = "flex g-1 items-center px-4 py-2 rounded-md";

    let variantClasses = "";
    switch (variant) {
        case 'primary':
            variantClasses = "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700";
            break;
        case 'danger':
            variantClasses = "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700";
            break;
        default: // 'default'
            variantClasses = "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600";
            break;
    }

    return <button className={`${baseClasses} ${variantClasses}`}
                   type="button"
                   onClick={onClick}>
        {iconName && <BaseIcon iconName={iconName} />}
        {text}
    </button>
}
