let CACHE = undefined;

/**
 * @returns {Map}
 */
function getCacheMap() {
    if (!CACHE)
        CACHE = new Map();
    return CACHE;
}

/**
 * @param {String} key 
 * @param {Object} value 
 */
function set(key, value, expireDuration) {
    const cache = getCacheMap();
    const expireTime = new Date((new Date()).getTime() + expireDuration);
    cache.set(key, { value, expireTime });
}

/**
 * @param {String} key 
 * @returns {Boolean}
 */
function has(key) {
    return getCacheMap().has(key);
}

/**
 * @param {String} key 
 */
function get(key) {
    const isExpired = (date) => date && date >= new Date();

    const item = getCacheMap().get(key);
    if (item && !isExpired(item.expireTime)) return item.value
}

/**
 * @param {String} key 
 */
function deleteItem(key) {
    return getCacheMap().delete(key);
}

const cacheStore = { set, has, get, delete: deleteItem };
export default cacheStore;