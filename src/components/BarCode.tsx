import {useState, useEffect} from "react";
import type {CodeDto} from "../data/CodeDto.ts";
import {delayedFetchBarcode} from "../services/BarCodeService.ts";
import spinner from '../assets/spinner.svg';

/**
 * A component for displaying a barcode.
 * @param code The code to display.
 * @param size The size of the barcode.
 */
export function BarCode({code, size}: {
    code: CodeDto,
    size?: 'small' | 'large',
}) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Effect for fetching data
    useEffect(() => {
        if (code.type && code.value) {
            // Set loading to true immediately to show feedback during the debounce/throttle period.
            setLoading(true);
            delayedFetchBarcode(code.type, code.value, setImageUrl, setLoading, setError);
        }
    }, [code.value, code.type]);

    // Effect for cleaning up
    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    const isSmall = size === 'small';

    return (
        <div className={`flex flex-col justify-center bg-white py-2 mb-4 ${!isSmall && 'aspect-square'}`}>
            {loading &&
                <img
                    className="text-black text-center py-4 block self-center"
                    width="40"
                    height="40"
                    src={spinner}
                    alt="Loading"
                />
            }
            {error && !loading &&
                <p className="bg-red-500 text-white text-center py-4 -my-2">Image could not be loaded.</p>}
            {imageUrl && !loading && !error &&
                <img
                    className={`block ${isSmall ? 'w-1/2 self-center' : 'w-full'}`}
                    src={imageUrl}
                    alt={code.value}
                />
            }
        </div>
    );
}
