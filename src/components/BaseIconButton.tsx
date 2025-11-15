type IconButtonProps = {
    onClick: () => void,
    text: string,
    iconName?: string,
}

export function BaseIconButton({onClick, text, iconName}: IconButtonProps) {

    return <button className="flex g-1 items-center"
                   type="button"
                   onClick={onClick}>
        {iconName &&
            <span className="material-symbols-outlined">
                {iconName}
            </span>}
        {text}
    </button>
}