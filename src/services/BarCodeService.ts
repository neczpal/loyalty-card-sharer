import {debounce} from "lodash";

const API_BASE_URL = "https://barcodeapi.org/api/";

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


export const delayedFetchBarcode = debounce(fetchBarcode, 400);