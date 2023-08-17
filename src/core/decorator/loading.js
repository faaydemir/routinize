// import { toast } from "react-toastify";
// import { toastError, toastLoading, toastSuccess } from "view/components/toast";
let loadingId = 0;

/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
export default function loading(func, loadingText, completedText) {
    loadingId++;

    async function wrapper(...args) {
        // const toastId = toastLoading(loadingText);
        try {
            const result = await func.apply(this, args);
            completedText = completedText ?? loadingText + " completed."
            // toastSuccess(completedText)
            return result;
        } catch (err) {
            // errorText = errorText ?? err.message
            // toastError(errorText);
            throw err;
        } finally {
            // toast.dismiss(toastId);
        }
    }
    return wrapper;
}