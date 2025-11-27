import CardStorageService from "./CardStorageService.ts";
import type {CardDto} from "../data/CardDto.ts";
import LZString from "lz-string";
import type {ShareCardDto} from "../data/ShareCardDto.ts";


class CardShareService {

    private toShareFormat(card: CardDto): ShareCardDto {
        return [
            card.name,
            card.color,
            card.code.type,
            card.code.value
        ];
    }

    private fromShareFormat(data: ShareCardDto): CardDto {
        return {
            id: crypto.randomUUID(),
            name: data[0],
            color: data[1],
            code: {
                type: data[2],
                value: data[3]
            }
        };
    }

    private toShareAllFormat(cards: CardDto[]): ShareCardDto[] {
        return cards.map(this.toShareFormat);
    }

    private fromShareAllFormat(data: ShareCardDto[]): CardDto[] {
        return data.map(this.fromShareFormat);
    }

    private exportAllCompressed(): string {
        const cards = CardStorageService.load();
        const shareData = this.toShareAllFormat(cards);
        return LZString.compressToEncodedURIComponent(JSON.stringify(shareData));
    }

    private exportSingleCompressed(card: CardDto): string {
        const shareData = this.toShareFormat(card);
        return LZString.compressToEncodedURIComponent(JSON.stringify(shareData));
    }

    createShareAllUrl(): string {
        const base64 = this.exportAllCompressed();
        const { origin, pathname } = window.location;
        return `${origin}${pathname}?shareAll=${base64}`;
    }

    importAllFromUrl(): CardDto[] | null {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("shareAll");
        if (!encoded) return null;

        try {
            const json = LZString.decompressFromEncodedURIComponent(encoded);
            if (!json) return null;
            const shareData = JSON.parse(json) as ShareCardDto[];
            return this.fromShareAllFormat(shareData);
        } catch (e) {
            console.error("Failed to decode shared card data", e);
            return null;
        }
    }

    createShareUrl(card: CardDto): string {
        const compressed = this.exportSingleCompressed(card);

        const { origin, pathname } = window.location;
        return `${origin}${pathname}?share=${compressed}`;
    }

    importShareFromUrl(): CardDto | null {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get("share");
        if (!encoded) return null;

        const json = LZString.decompressFromEncodedURIComponent(encoded);
        if (!json) return null;
        const shareData = JSON.parse(json) as ShareCardDto;
        return this.fromShareFormat(shareData);
    }
}

const cardShareService = new CardShareService();
export default cardShareService;