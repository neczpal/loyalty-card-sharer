import { BaseIconButton } from './BaseIconButton';

type ToggleButtonProps = {
    onClick: () => void;
    toggled: boolean;
    onIconName: string;
    offIconName: string;
    onText: string;
    offText: string;
}

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
