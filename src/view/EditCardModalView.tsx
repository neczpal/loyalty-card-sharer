import {ModalWindow} from "../components/ModalWindow.tsx";
import {BaseTextInput} from "../components/BaseTextInput.tsx";
import {BaseDropdownInput} from "../components/BaseDropdownInput.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";
import {BarCode} from "../components/BarCode.tsx";
import type {CardDto} from "../data/CardDto.ts";
import {useState} from "react";

export function EditCardModalView({card, onExit}: {
    card?: CardDto;
    onExit: (card?: CardDto) => void;
}) {
    const [displayName, setDisplayName] = useState(card?.name || "");
    const [displayColor, setDisplayColor] = useState(card?.color || "#3B82F6");
    const [codeValue, setCodeValue] = useState(card?.code.value || "");
    const [codeType, setCodeType] = useState(card?.code?.type || "qr");

    const exitWithSave = () => {
        const cardToBeSaved = {
            id: card?.id || crypto.randomUUID(),
            color: displayColor,
            name: displayName,
            code: {
                type: codeType,
                value: codeValue
            }
        }
        onExit(cardToBeSaved);
    }

    return (
        <ModalWindow color="#000" onClose={() => {
        }}>
            <h1>Add new card to your collection:</h1>
            <BaseTextInput label="Card name" name="shop" placeholder="card name" value={displayName}
                           onChange={setDisplayName}/>
            <BaseDropdownInput label="Color" name="card_color" value={displayColor} onChange={setDisplayColor}
                               options={[
                                   {value: '#3B82F6', label: 'Blue'},
                                   {value: '#06B6D4', label: 'Cyan'},
                                   {value: '#14B8A6', label: 'Teal'},
                                   {value: '#22C55E', label: 'Green'},
                                   {value: '#84CC16', label: 'Lime'},
                                   {value: '#EAB308', label: 'Yellow'},
                                   {value: '#F59E0B', label: 'Orange'},
                                   {value: '#EF4444', label: 'Red'},
                                   {value: '#EC4899', label: 'Pink'},
                                   {value: '#A855F7', label: 'Purple'},
                                   {value: '#6366F1', label: 'Indigo'},
                                   {value: '#64748B', label: 'Slate'},
                               ]}/>

            <BaseTextInput label="Card code" name="code_value" placeholder="Card's code" value={codeValue} onChange={setCodeValue}/>
            <BaseDropdownInput label="Card type" name="card_type" value={codeType} onChange={setCodeType} options={[
                {value: 'qr', label: 'QR Code'},
                {value: '128', label: 'BarCode 128'},
            ]}/>
            <h2>Preview</h2>
            <BarCode size="small" code={{value: codeValue, type: codeType}}/>
            <BaseIconButton onClick={() => onExit()} text="cancel"/>
            <BaseIconButton onClick={() => exitWithSave()} text="Add new card"/>
        </ModalWindow>
    );
}