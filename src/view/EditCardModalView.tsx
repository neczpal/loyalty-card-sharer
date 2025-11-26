import {ModalWindow} from "../components/ModalWindow.tsx";
import {BaseTextInput} from "../components/BaseTextInput.tsx";
import {BaseDropdownInput} from "../components/BaseDropdownInput.tsx";
import {BaseIconButton} from "../components/BaseIconButton.tsx";
import {BarCode} from "../components/BarCode.tsx";
import type {CardDto} from "../data/CardDto.ts";
import {useState} from "react";
import {LayoutModal} from "../layouts/LayoutModal.tsx";

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

    const header = card ? "Edit card" : "Add new card";
    const saveText = card ? "Save" : "Add";
    const saveIcon = card ? "save" : "add";

    return (
        <ModalWindow onClose={() => onExit()}>
            <LayoutModal header={header}>
                <div className="flex flex-col gap-2 h-full">
                    <BaseTextInput label="Name"
                                   name="displayName"
                                   placeholder="Displayed name of the card"
                                   value={displayName}
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

                    <BaseTextInput label="Code"
                                   name="code_value"
                                   placeholder="Code of the card"
                                   value={codeValue}
                                   onChange={setCodeValue}/>

                    <BaseDropdownInput label="Type" name="card_type" value={codeType} onChange={setCodeType}
                                       options={[
                                           {value: 'qr', label: 'QR Code'},
                                           {value: '128', label: 'BarCode 128'},
                                       ]}/>

                    <span>Preview: </span>
                    { codeValue ? (
                        <BarCode size="small" code={{value: codeValue, type: codeType}}/>
                    ) : (
                        <span className="text-center color-black/50">Enter a code to see preview</span>
                    )
                    }
                    <div className="flex flex-row mt-auto justify-center gap-8">
                        <BaseIconButton onClick={exitWithSave} text={saveText} iconName={saveIcon}/>
                        <BaseIconButton onClick={() => onExit()} text="Cancel" iconName="close"/>
                    </div>
                </div>
            </LayoutModal>
        </ModalWindow>
    );
}
