export type SelectOption = {
    label: string;
    value: string;
};

export type SelectInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    autofocus?: boolean;
};

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
        <div>
            <label htmlFor={name}>{label}: </label>
            <select
                name={name}
                className="p-3"
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