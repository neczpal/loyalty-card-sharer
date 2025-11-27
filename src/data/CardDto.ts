import type {CodeDto} from "./CodeDto.ts";

/**
 * Represents a loyalty card.
 */
export type CardDto = {
    /**
     * The unique identifier of the card.
     */
    id: string,
    /**
     * The name of the card.
     */
    name: string,
    /**
     * The color of the card.
     */
    color: string,
    /**
     * The code associated with the card.
     */
    code: CodeDto,
}