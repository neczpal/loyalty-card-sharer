import { BaseIconButton } from './BaseIconButton.tsx';

/**
 * Props for the BaseToggleButton component.
 */
type ToggleButtonProps = {
    onClick: () => void;
    toggled: boolean;
    onIconName: string;
    offIconName: string;
    onText: string;
    offText: string;
}

/**
 * A base toggle button component.
 * @param onClick A callback function that is called when the button is clicked.
 * @param toggled Whether the button is toggled on or off.
 * @param onIconName The name of the material icon to display when the button is toggled on.
 * @param offIconName The name of the material icon to display when the button is toggled off.
 * @param onText The text to display when the button is toggled on.
 * @param offText The text to display when the button is toggled off.
 */
export function BaseToggleButton({ onClick, toggled, onIconName, offIconName, onText, offText }: ToggleButtonProps) {
    const iconName = toggled ? onIconName : offIconName;
    const text = toggled ? onText : offText;

    return (
        <BaseIconButton
            onClick={onClick}
            iconName={iconName}
            text={text}
        />
    );
}
