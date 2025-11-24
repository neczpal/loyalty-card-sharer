import './App.css'
import type {CardDto} from "./data/CardDto.ts";
import {TileView} from "./view/TileView.tsx";
import {ScanCardView} from "./view/ScanCardView.tsx";
import {useState} from "react";
import {EditCardView} from "./view/EditCardView.tsx";
import CardStorageService from "./CardStorageService.ts";

function App() {
    const [selectedCard, setSelectedCard] = useState<CardDto | undefined>(undefined);
    const [scanOpen, setScanOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [allCards, setAllCards] = useState(CardStorageService.load());
    // const allCards: CardDto[] = [
    //     {id: "1", name: "Tesco Clubcard", color: "#00539F", code: { value: "634009540032917769", type: "128" }},
    //     {id: "2", name: "Lidl Plus", color: "#FFD500", code: { value: "77360008206828727", type: "qr"}},
    //     {id: "3", name: "MOL Move", color: "#007A33", code: { value: "6369472225706715", type: "128"}},
    //     {id: "4", name: "Decathlon", color: "#3643ba", code: { value: "2094038666954", type: "128"}},
    //     {id: "5", name: "Aldi", color: "#1C5FA8",  code: { value: "123123123", type: "qr"}},
    //     {id: "6", name: "Auchan", color: "#E30613", code: { value: "123123123", type: "qr"}},
    // ];
    // CardStorageService.save(allCards);

    const openScanCardView = (card: CardDto) => {
        setSelectedCard(card);
        setScanOpen(true);
    }

    const openEditCardView = (card: CardDto) => {
        setSelectedCard(card);
        setEditorOpen(true);
    }

    const deleteCard = (card: CardDto) => {
        CardStorageService.remove(card);
        setAllCards(CardStorageService.load());
    }

    const closeScanCard = () => {
        setSelectedCard(undefined);
        setScanOpen(false);
    }

    const closeEditCard = (card?: CardDto) => {
        if (card) {
            CardStorageService.addOrUpdate(card);
            setAllCards(CardStorageService.load());
        }
        setSelectedCard(undefined);
        setEditorOpen(false);
    }

    return (
        <div className="flex flex-col p-6 md:p-12 h-full items-center justify-around">
            <TileView
                cards={allCards}
                onOpen={(card) => openScanCardView(card)}
                onEdit={(card) => openEditCardView(card)}
                onDelete={(card) => deleteCard(card)}
            />
            {editorOpen &&
                <EditCardView
                    onExit={closeEditCard}
                    card={selectedCard}
                />
            }
            {scanOpen && selectedCard != undefined &&
                <ScanCardView card={selectedCard}
                              onClose={closeScanCard}/>
            }
        </div>
    )
}

export default App
