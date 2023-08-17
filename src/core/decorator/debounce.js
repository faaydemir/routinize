//from https://www.joshwcomeau.com/snippets/javascript/debounce/

/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
export default function debounce(func, wait) {
    let timeOutId;
    async function wrapper(...args) {
        window.clearTimeout(timeOutId);
        timeOutId = window.setTimeout(async () => {
            const result = await func.apply(this, args);
            return result;
        }, wait);
    }
    return wrapper;
}