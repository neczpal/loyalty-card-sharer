import './App.css'
import type {CardDto} from "./data/CardDto.ts";
import {TileView} from "./TileView.tsx";
import {DetailsView} from "./DetailsView.tsx";
import {useState} from "react";

function App() {
    const [selectedCard, setSelectedCard] = useState<CardDto | null>(null);



    const allCards: CardDto[] = [
        {id: 1, name: "Tesco Clubcard", color: "#00539F", code: "634009540032917769", type: "128"},  // blue
        {id: 2, name: "Lidl Plus", color: "#FFD500", code: "aOHSHA", type: "qr"},  // blue    // yellow
        {id: 3, name: "Penny Market", color: "#D0021B", code: "123123123", type: "qr"},  // blue    // red
        {id: 4, name: "Aldi", color: "#1C5FA8", code: "123123123", type: "qr"},  // blue
        {id: 5, name: "Auchan", color: "#E30613", code: "123123123", type: "qr"},  // blue
        {id: 6, name: "Spar", color: "#007A33", code: "123123123", type: "qr"},  // blue
    ];

    return (
        <div className="flex flex-col p-6 md:p-12 h-full items-center justify-around">
            {selectedCard === null ? (
                <TileView cards={allCards} onSelect={(card) => setSelectedCard(card)} />
            ) : (
                <DetailsView card={selectedCard} onClose={() => setSelectedCard(null)} />
            )}
        </div>
    )
}

export default App
