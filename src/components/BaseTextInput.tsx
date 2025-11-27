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
    return <div className="flex flex-col items-center gap-2">
        <label className="text-md ml-2 self-start" htmlFor={name}>{label}: </label>
        <input className="h-[40px] w-full p-4 bg-gray-100 dark:bg-gray-700"
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