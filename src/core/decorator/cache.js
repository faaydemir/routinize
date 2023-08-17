import cacheStore from "core/cache-store";

let count = 0;

/**
 * @template T
 * @param  {T} func
 * @returns {T}
 */
function cache(func) {
    const functionKey = count++;
    async function wrapper(...args) {

        const argsKey = args && JSON.stringify(args);
        const key = func.name + "-" + functionKey + "-" + argsKey;

        if (cacheStore.has(key)) return cacheStore.get(key);

        const result = await func.apply(this, args);
        cacheStore.set(key, result);
        return result;
    }
    return wrapper;
}


export default cache;