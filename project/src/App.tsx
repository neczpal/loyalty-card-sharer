import type {CardDto} from "./data/CardDto.ts";
import {ListView} from "./view/ListView.tsx";
import {ScanCardModalView} from "./view/ScanCardModalView.tsx";
import {useEffect, useState} from "react";
import {EditCardModalView} from "./view/EditCardModalView.tsx";
import {ImportShareModalView} from "./view/ImportShareModalView.tsx";
import {ExportShareModalView} from "./view/ExportShareModalView.tsx";
import cardShareService from "./services/CardShareService.ts";
import cardStorageService from "./services/CardStorageService.ts";

/**
 * The main component of the application.
 * It manages the state of the application and renders the different views.
 */
function App() {
    const [selectedCard, setSelectedCard] = useState<CardDto | undefined>(undefined);
    const [scanOpen, setScanOpen] = useState(false);
    const [editorOpen, setEditorOpen] = useState(false);
    const [allCards, setAllCards] = useState(cardStorageService.load());
    const [pendingSharedCards, setPendingSharedCards] = useState<CardDto[] | null>(null);
    const [importShareDialogOpen, setImportShareDialogOpen] = useState(false);
    const [shareAllWindowOpen, setShareAllWindowOpen] = useState(false);

    useEffect(() => {
        const shareAll = cardShareService.importAllFromUrl();
        const localCards = cardStorageService.load();

        // share all link and no local cards -> import without dialog
        if (shareAll && shareAll.length > 0 && localCards.length === 0) {
            cardStorageService.save(shareAll);
            setAllCards(shareAll);
            clearQuery();
            return;
        }

        // share all link and existing cards -> show dialog
        if (shareAll && shareAll.length > 0) {
            setPendingSharedCards(shareAll);
            setImportShareDialogOpen(true);
        }

        // share single link -> show add modal
        const share = cardShareService.importShareFromUrl();
        if (share) {
            setEditorOpen(true);
            setSelectedCard(share);
            clearQuery();
        }
    }, []);

    const clearQuery = () => {
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
        cardStorageService.remove(card);
        setAllCards(cardStorageService.load());
    }

    const closeScanCard = () => {
        setSelectedCard(undefined);
        setScanOpen(false);
    }

    const closeEditCard = (card?: CardDto) => {
        if (card) {
            cardStorageService.addOrUpdate(card);
            setAllCards(cardStorageService.load());
        }
        setSelectedCard(undefined);
        setEditorOpen(false);
    }

    const reorderCards = (cards: CardDto[]) => {
        cardStorageService.save(cards);
        setAllCards(cards);
    };

    return (
        <div className="flex flex-col h-full items-center justify-around">
            <ListView
                cards={allCards}
                onOpen={(card) => openScanCardView(card)}
                onEdit={(card) => openEditCardView(card)}
                onDelete={(card) => deleteCard(card)}
                onShareAll={() => setShareAllWindowOpen(true)}
                onReorder={(cards) => reorderCards(cards)}
            />
            {importShareDialogOpen && pendingSharedCards &&
                <ImportShareModalView
                    onOverride={() => {
                        cardStorageService.save(pendingSharedCards);
                        setAllCards(pendingSharedCards);
                        clearQuery();
                        setImportShareDialogOpen(false);
                    }}
                    onAddAll={() => {
                        const merged = [...allCards, ...pendingSharedCards];
                        cardStorageService.save(merged);
                        setAllCards(merged);
                        clearQuery();
                        setImportShareDialogOpen(false);
                    }}
                    onCancel={() => {
                        clearQuery();
                        setImportShareDialogOpen(false)
                    }}
                />
            }
            {shareAllWindowOpen &&
                <ExportShareModalView shareAllUrl={cardShareService.createShareAllUrl()}
                                      onClose={() => setShareAllWindowOpen(false)}
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
