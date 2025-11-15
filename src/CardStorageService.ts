import type { CardDto } from "./data/CardDto";

export default class CardStorageService {
    private static readonly KEY = "cardList";

    static save(cards: CardDto[]): void {
        try {
            const json = JSON.stringify(cards);
            localStorage.setItem(this.KEY, json);
        } catch (e) {
            console.error("Failed to save cards:", e);
        }
    }

    static load(): CardDto[] {
        try {
            const json = localStorage.getItem(this.KEY);
            if (!json) return [];
            return JSON.parse(json) as CardDto[];
        } catch (e) {
            console.error("Failed to load cards:", e);
            return [];
        }
    }

    static add(card: CardDto): void {
        try {
            const cards = this.load();
            cards.push(card);
            this.save(cards);
        } catch (e) {
            console.error("Failed to add card and save:", e);
        }
    }

    static clear(): void {
        localStorage.removeItem(this.KEY);
    }
}