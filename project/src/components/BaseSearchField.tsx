import { BaseIcon } from './BaseIcon.tsx';

/**
 * Props for the BaseSearchField component.
 */
interface BaseSearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * A base search field component.
 * @param value The value of the search field.
 * @param onChange A callback function that is called when the value of the search field changes.
 * @param placeholder The placeholder text for the search field.
 */
export function BaseSearchField({ value, onChange, placeholder = "Search" }: BaseSearchFieldProps) {
    return (
        <div className="relative flex items-center">
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-10 py-2 border rounded-md"
            />
            <div className="absolute left-3">
                <BaseIcon iconName="search" />
            </div>
            {value.length > 0 && (
                <button onClick={() => onChange("")} className="absolute right-3">
                    <BaseIcon iconName="close" />
                </button>
            )}
        </div>
    );
}
