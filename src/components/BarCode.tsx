import type {CodeDto} from "../data/CodeDto.ts";

export function BarCode({code, size} :{
    code: CodeDto,
    size?: 'small' | 'large',
}) {
    // #TODO with fetch myb?
    const codeImg = `https://barcodeapi.org/api/${code.type}/${code.value}`;
    const isSmall = size == 'small';

    return (
        <div className={`flex flex-col justify-center bg-white py-2 mb-4 ${!isSmall && 'aspect-square'}`}>
            {code && code.type && code.value &&
                <img
                    className={`block ${isSmall ? 'w-1/2 self-center' : 'w-full'}`}
                    src={codeImg}
                    alt={code.value}
                />
            }
        </div>
    );
}