export type TextInputProps = {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
}

export function BaseTextInput({label, name, value, onChange, type, placeholder, onEnter, autofocus}:
                          TextInputProps) {
    return <div>
        <label className="text-lg font-mono text-center" htmlFor={name}>{label}: </label>
        <input className="p-3"
               name={name}
               type={type}
               value={value}
               onInput={e => onChange(e.currentTarget.value)}
               placeholder={placeholder}
               autoFocus={autofocus}
               onKeyDown={ onEnter ? e =>
               {
                   if ( e.key === "Enter" )
                       onEnter!();
               } : undefined }/>
    </div>
}