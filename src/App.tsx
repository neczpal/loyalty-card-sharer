import './App.css'
import type {CardDto} from "./data/CardDto.ts";
import {TileView} from "./view/TileView.tsx";
import {DetailsView} from "./view/DetailsView.tsx";
import {useState} from "react";
import {EditCardView} from "./view/EditCardView.tsx";
import CardStorageService from "./CardStorageService.ts";

function App() {
    const [selectedCard, setSelectedCard] = useState<CardDto | null>(null);
    const [editorOpen, setEditorOpen] = useState(true);

    // const allCards: CardDto[] = [
    //     {id: "1", name: "Tesco Clubcard", color: "#00539F", code: { value: "634009540032917769", type: "128" }},
    //     {id: "2", name: "Lidl Plus", color: "#FFD500", code: { value: "77360008206828727", type: "qr"}},
    //     {id: "3", name: "MOL Move", color: "#007A33", code: { value: "6369472225706715", type: "128"}},
    //     {id: "4", name: "Decathlon", color: "#3643ba", code: { value: "2094038666954", type: "128"}},
    //     {id: "5", name: "Aldi", color: "#1C5FA8",  code: { value: "123123123", type: "qr"}},
    //     {id: "6", name: "Auchan", color: "#E30613", code: { value: "123123123", type: "qr"}},
    // ];
    // CardStorageService.save(allCards);
    const allCards = CardStorageService.load();


    return (
        <div className="flex flex-col p-6 md:p-12 h-full items-center justify-around">
            <TileView cards={allCards} onSelect={(card) => setSelectedCard(card)} />
            {editorOpen && <EditCardView onExit={() => setEditorOpen(false)} /> }
            {selectedCard !== null && (
                <DetailsView card={selectedCard} onClose={() => setSelectedCard(null)} />
            )}
        </div>
    )
}

export default App
