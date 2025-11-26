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
        <div className="flex flex-col items-center gap-2 m-2">
            <label className="text-md self-start" htmlFor={name}>{label}: </label>
            <select
                name={name}
                className="h-[40px] w-full px-4 bg-gray-100 dark:bg-gray-700"
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