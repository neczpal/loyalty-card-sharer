import type {CodeDto} from "../data/CodeDto.ts";

export function BarCode({code} :{
    code: CodeDto,
}) {
    // #TODO with fetch myb?
    const codeImg = `https://barcodeapi.org/api/${code.type}/${code.value}`;

    return (
        <div className="flex flex-col justify-center bg-white py-2 mb-4 aspect-square">
            {code && code.type && code.value &&
                <img className="block w-full" src={codeImg} alt={code.value} />
            }
        </div>
    );
}