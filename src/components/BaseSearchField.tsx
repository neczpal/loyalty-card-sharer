interface BaseSearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

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
                <span>🔎</span>
            </div>
            {value.length > 0 && (
                <button onClick={() => onChange("")} className="absolute right-3">
                    <span>❌</span>
                </button>
            )}
        </div>
    );
}
