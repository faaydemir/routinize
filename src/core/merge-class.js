import { isString } from 'lodash';

/**
 * @param  {...string} classes
 */
const cc = (...classes) => {
    if (!classes) return undefined;

    const validClasses = classes.filter(c => isString(c));
    return validClasses.join(' ');
};

/**
 * to use like ...classes("a","b","c") ???
 * @param  {...string} classes
 */
export const classes = (...classes) => {
    return { className: cc(...classes) };
};

export default cc;