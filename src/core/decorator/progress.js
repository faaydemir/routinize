import { progressState } from "core/custom-hook/progressing";

let progressingId = 0;


/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
export default function progress(func, proggessId) {

    async function wrapper(...args) {
        try {
            progressState.mutate({ [`${proggessId}`]: true });
            const result = await func.apply(this, args);
            return result;
        } catch (err) {
            throw err;
        } finally {
            progressState.mutate({ [`${proggessId}`]: false });
        }
    }
    return wrapper;
}