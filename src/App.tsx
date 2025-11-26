import './App.css'
import type {CardDto} from "./data/CardDto.ts";
import {ListView} from "./view/ListView.tsx";
import {ScanCardModalView} from "./view/ScanCardModalView.tsx";
import {useEffect, useState} from "react";
import {EditCardModalView} from "./view/EditCardModalView.tsx";
import {ImportShareModalView} from "./view/ImportShareModalView.tsx";
import {ExportShareModalView} from "./view/ExportShareModalView.tsx";
import CardStorageService from "./services/CardStorageService.ts";
import CardShareService from "./services/CardShareService.ts";

function App() {
    const [selectedCard, setSelectedCard] = useState<CardDto | undefined>(undefined);
    const [scanOpen, setScanOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [allCards, setAllCards] = useState(CardStorageService.load());
    const [pendingSharedCards, setPendingSharedCards] = useState<CardDto[] | null>(null);
    const [importShareDialogOpen, setImportShareDialogOpen] = useState(false);
    const [shareWindowOpen, setShareWindowOpen] = useState(false);

    useEffect(() => {
        const shared = CardShareService.importFromUrl();
        const localCards = CardStorageService.load();

        // share link and no local cards -> import without dialog
        if (shared && shared.length > 0 && localCards.length === 0) {
            CardStorageService.save(shared);
            setAllCards(shared);
            clearShareQuery();
            return;
        }

        // share link and existing cards -> show dialog
        if (shared && shared.length > 0) {
            setPendingSharedCards(shared);
            setImportShareDialogOpen(true);
        }
    }, []);

    const clearShareQuery = () => {
        const cleanUrl = window.location.href.split("?")[0];
        window.history.replaceState({}, "", cleanUrl);
    };

    const openScanCardView = (card: CardDto) => {
        setSelectedCard(card);
        setScanOpen(true);
    }

    const openEditCardView = (card?: CardDto) => {
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

    const reorderCards = (cards: CardDto[]) => {
        CardStorageService.save(cards);
        setAllCards(cards);
    };

    return (
        <div className="flex flex-col h-full items-center justify-around">
            <ListView
                cards={allCards}
                onOpen={(card) => openScanCardView(card)}
                onEdit={(card) => openEditCardView(card)}
                onDelete={(card) => deleteCard(card)}
                onShare={() => setShareWindowOpen(true)}
                onReorder={(card) => reorderCards(card)}
            />
            {importShareDialogOpen && pendingSharedCards &&
                <ImportShareModalView
                    onOverride={() => {
                        CardStorageService.save(pendingSharedCards);
                        setAllCards(pendingSharedCards);
                        clearShareQuery();
                        setImportShareDialogOpen(false);
                    }}
                    onAddAll={() => {
                        const merged = [...allCards, ...pendingSharedCards];
                        CardStorageService.save(merged);
                        setAllCards(merged);
                        clearShareQuery();
                        setImportShareDialogOpen(false);
                    }}
                    onCancel={() => {
                        clearShareQuery();
                        setImportShareDialogOpen(false)
                    }}
                />
            }
            {shareWindowOpen &&
                <ExportShareModalView shareUrl={CardShareService.createShareUrl()}
                                      onClose={() => setShareWindowOpen(false)}
                />
            }
            {editorOpen &&
                <EditCardModalView
                    onExit={card => closeEditCard(card)}
                    card={selectedCard}
                />
            }
            {scanOpen && selectedCard != undefined &&
                <ScanCardModalView card={selectedCard}
                                   onClose={closeScanCard}/>
            }
        </div>
    )
}

export default App
