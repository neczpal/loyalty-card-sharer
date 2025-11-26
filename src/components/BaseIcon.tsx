interface IconProps {
    iconName: string;
}

export function BaseIcon({ iconName }: IconProps) {
    return (
        <span className="block material-symbols-outlined user-select-none">
            {iconName}
        </span>
    );
}
