import { BaseIcon } from './BaseIcon';

type IconButtonProps = {
    onClick: () => void,
    text: string,
    iconName?: string,
}

export function BaseIconButton({onClick, text, iconName}: IconButtonProps) {

    return <button className="flex g-1 items-center px-4 py-2 rounded-md bg-gray-200 text-gray-700
                              dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                   type="button"
                   onClick={onClick}>
        {iconName && <BaseIcon iconName={iconName} />}
        {text}
    </button>
}