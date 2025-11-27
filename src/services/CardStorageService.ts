import type { CardDto } from "../data/CardDto.ts";

/**
 * Service for managing loyalty cards in local storage.
 */
class CardStorageService {
    private readonly KEY = "cardList";

    /**
     * Saves an array of cards to local storage.
     * @param cards The cards to save.
     */
    save(cards: CardDto[]): void {
        try {
            const json = JSON.stringify(cards);
            localStorage.setItem(this.KEY, json);
        } catch (e) {
            console.error("Failed to save cards:", e);
        }
    }

    /**
     * Loads all cards from local storage.
     * @returns An array of cards.
     */
    load(): CardDto[] {
        try {
            const json = localStorage.getItem(this.KEY);
            if (!json) return [];
            return JSON.parse(json) as CardDto[];
        } catch (e) {
            console.error("Failed to load cards:", e);
            return [];
        }
    }

    /**
     * Adds a new card or updates an existing one.
     * @param card The card to add or update.
     */
    addOrUpdate(card: CardDto): void {
        try {
            let cards= this.load();
            cards = cards.filter(c => c.id !== card.id);
            cards.push(card);
            this.save(cards);
        } catch (e) {
            console.error("Failed to add card and save:", e);
        }
    }

    /**
     * Removes a card from local storage.
     * @param card The card to remove.
     */
    remove(card: CardDto): void {
        try {
            const cards = this.load();
            const filtered = cards.filter(c => c.id !== card.id);
            this.save(filtered);
        } catch (e) {
            console.error("Failed to remove card:", e);
        }
    }

    /**
     * Removes all cards from local storage.
     */
    clear(): void {
        localStorage.removeItem(this.KEY);
    }
}

const cardStorageService = new CardStorageService();
export default cardStorageService;