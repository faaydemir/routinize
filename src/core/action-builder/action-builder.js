let actionIdIndex = 0;
export default class ActionBuilder {

    constructor(decorators = undefined) {
        this.decorators = decorators ?? [];
        this.id = actionIdIndex++;
        this.befores = [];
        this.afters = [];
    }

    /**
     * decorate
     * @param {Array<Function>|Function} decorators
     * @returns {this}
     */
    decorate(decorators, ...args) {
        if (decorators instanceof Array) {
            this.decorators = this.decorators.concat(decorators);
        } else {
            this.decorators.unshift({ decorator: decorators, args });
        }
        return this;
    }

    /**
     * decorate
     * @param {Function} func
     * @returns {this}
     */
    before(func, key = undefined) {
        if (key) {
            this.befores = this.befores.filter(f => f.key !== key);
        }
        this.befores.push({ func, key });
        return this;
    }

    /**
     * decorate
     * @param {Function} func
     * @returns {this}
     */
    after(func, key = undefined) {
        if (key) {
            this.afters = this.afters.filter(f => f.key !== key);
        }

        this.afters.push({ func, key });
        return this;
    }

    /**
     * decorate
     * @param {Array<Function>} funcs
     */
    runAll(funcs, args) {
        for (const func of funcs) {
            func.call(args);
        }
    }

    /**
     * hasDecorator
     * @param {Function} decorator
     * @returns {boolean}
     */
    hasDecorator(decorator) {
        return this.decorators.some(d => d.decorator === decorator)
    }

    /**
     * @template T
     * @param  {T} action
     * @returns {T}
     */
    do(action) {
        for (const { decorator, args } of this.decorators) {
            action = decorator.call(this, action, ...args);
        }

        const wrapper = async (...args) => {
            this.runAll(this.befores.map(b => b.func), args);
            const result = await action.call(this, ...args);
            this.runAll(this.afters.map(b => b.func), { args, result });
            return result;
        }
        wrapper.action = this;

        return wrapper;
    }
}