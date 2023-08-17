let lockIdIndex = 0;
const locks = new Map();
/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
export default function lock(func) {
    const key = lockIdIndex++;
    async function wrapper(...args) {
        if (locks.has(key)) return;
        locks.set(key, true);
        try {
            const result = await func.apply(this, args);
            return result;
        } catch (err) {
            throw err;
        } finally {
            locks.delete(key);
        }
    }
    return wrapper;
}