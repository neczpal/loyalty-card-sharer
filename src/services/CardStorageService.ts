import type { CardDto } from "../data/CardDto.ts";

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

    static addOrUpdate(card: CardDto): void {
        try {
            let cards= this.load();
            cards = cards.filter(c => c.id !== card.id);
            cards.push(card);
            this.save(cards);
        } catch (e) {
            console.error("Failed to add card and save:", e);
        }
    }

    static remove(card: CardDto): void {
        try {
            const cards = this.load();
            const filtered = cards.filter(c => c.id !== card.id);
            this.save(filtered);
        } catch (e) {
            console.error("Failed to remove card:", e);
        }
    }

    static clear(): void {
        localStorage.removeItem(this.KEY);
    }
}