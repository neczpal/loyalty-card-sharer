/**
 * Props for the BaseTextInput component.
 */
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

/**
 * A base text input component.
 * @param label The label for the input.
 * @param name The name of the input.
 * @param value The value of the input.
 * @param onChange A callback function that is called when the value of the input changes.
 * @param type The type of the input.
 * @param placeholder The placeholder text for the input.
 * @param onEnter A callback function that is called when the Enter key is pressed.
 * @param autofocus Whether the input should be focused on mount.
 */
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