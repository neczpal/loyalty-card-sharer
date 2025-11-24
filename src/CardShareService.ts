import CardStorageService from "./CardStorageService";
import type {CardDto} from "./data/CardDto";
import LZString from "lz-string";

// [name, color, type, value]
type ShareCardDto = [string, string, string, string];

export default class CardShareService {

    static toShareFormat(cards: CardDto[]): ShareCardDto[] {
        return cards.map(c => [
            c.name,
            c.color,
            c.code.type,
            c.code.value
        ]);
    }

    static fromShareFormat(data: ShareCardDto[]): CardDto[] {
        return data.map(arr => ({
            id: crypto.randomUUID(),
            name: arr[0],
            color: arr[1],
            code: {
                type: arr[2],
                value: arr[3]
            }
        }));
    }

    static exportBase64(): string {
        const cards = CardStorageService.load();
        const shareData = this.toShareFormat(cards);
        return LZString.compressToEncodedURIComponent(JSON.stringify(shareData));
    }

    static createShareUrl(): string {
        const base64 = this.exportBase64();
        const origin = window.location.origin;
        const path = window.location.pathname;

        return `${origin}${path}?share=${base64}`;
    }

    static importFromUrl(): CardDto[] | null {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("share");
        if (!encoded) return null;

        try {
            const json = LZString.decompressFromEncodedURIComponent(encoded);
            if (!json) return null;
            const shareData = JSON.parse(json) as ShareCardDto[];
            return this.fromShareFormat(shareData);
        } catch (e) {
            console.error("Failed to decode shared card data", e);
            return null;
        }
    }
}