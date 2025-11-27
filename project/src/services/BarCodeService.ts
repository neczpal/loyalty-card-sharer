import {debounce} from "lodash";

const API_BASE_URL = "https://barcodeapi.org/api/";

/**
 * Fetches a barcode image from an external API: barcodeapi.org
 * @param codeType The type of the barcode.
 * @param codeValue The value of the barcode.
 * @param setImageUrl A function to set the URL of the generated barcode image.
 * @param setLoading A function to set the loading state.
 * @param setError A function to set the error message.
 */
const fetchBarcode = (
    codeType: string,
    codeValue: string,
    setImageUrl: (url: string | null) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
) => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}${codeType}/${codeValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
        })
        .catch(error => {
            setError(error.message);
        })
        .finally(() => {
            // The component turns loading on, the service turns it off.
            setLoading(false);
        });
};


/**
 * A debounced version of the fetchBarcode function.
 * This is useful for fetching barcodes based on user input, as it prevents sending a request for every keystroke.
 * @see fetchBarcode
 */
export const delayedFetchBarcode = debounce(fetchBarcode, 400);