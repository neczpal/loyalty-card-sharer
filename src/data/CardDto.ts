import type {CodeDto} from "./CodeDto.ts";

export type CardDto = {
    id: string,
    name: string,
    color: string,
    code: CodeDto,
}