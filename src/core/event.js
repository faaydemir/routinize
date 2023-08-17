class OneTimeEvent {
    static uniqueIndex = 0
    constructor(name) {
        this.name = name;
        this.callbacks = [];
    }
    register(func) {
        const id = ++OneTimeEvent.uniqueIndex;
        this.callbacks.push({ id, func });
        return id;
    }
    unregister(id) {
        this.callbacks = this.callbacks.filter(c => c.id !== id);
    }
    dispatch() {
        const callbacks = [...this.callbacks];
        this.callbacks = [];
        callbacks.forEach((callback) => {
            callback.func();
        });
    }
}

export default OneTimeEvent;