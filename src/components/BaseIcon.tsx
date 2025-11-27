/**
 * Props for the BaseIcon component.
 */
interface IconProps {
    iconName: string;
}

/**
 * A component for displaying a material symbols icon.
 * @param iconName The name of the material symbols icon to display.
 */
export function BaseIcon({ iconName }: IconProps) {
    return (
        <span className="block material-symbols-outlined user-select-none">
            {iconName}
        </span>
    );
}
