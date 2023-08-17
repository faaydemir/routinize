import { logError } from "core/log";
// import { toastError } from "view/components/toast";

/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
export default function handleError(func, errorText) {

    async function wrapper(...args) {
        try {
            const result = await func.apply(this, args);
            return result;
        } catch (err) {
            errorText = errorText ?? err.message
            // toastError(errorText);
            console.error(errorText)
            logError(err)
        }
    }
    return wrapper;
}