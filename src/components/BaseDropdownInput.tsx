/**
 * Represents an option in a select input.
 */
export type SelectOption = {
    label: string;
    value: string;
};

/**
 * Props for the BaseDropdownInput component.
 */
export type SelectInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    autofocus?: boolean;
};

/**
 * A base dropdown input component.
 * @param label The label for the input.
 * @param name The name of the input.
 * @param value The value of the input.
 * @param onChange A callback function that is called when the value of the input changes.
 * @param options The options for the input.
 * @param placeholder The placeholder text for the input.
 * @param autofocus Whether the input should be focused on mount.
 */
export function BaseDropdownInput({
                                      label,
                                      name,
                                      value,
                                      onChange,
                                      options,
                                      placeholder,
                                      autofocus
                                  }: SelectInputProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <label className="ml-2 text-md self-start" htmlFor={name}>{label}: </label>
            <select
                name={name}
                className="indent-2 h-[40px] w-full bg-gray-100 dark:bg-gray-700"
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                autoFocus={autofocus}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}