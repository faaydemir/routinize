import ActionBuilder from "core/action-builder/action-builder";
import debounce from "core/decorator/debounce";
import handleError from "core/decorator/handle-error";
import loading from "core/decorator/loading";
import lock from "core/decorator/lock";

class AppActionBuilder extends ActionBuilder {

    /**
     * @returns {AppActionBuilder}
     */
    lock() {
        return this.decorate(lock);
    }

    /**
     * @returns {AppActionBuilder}
     */
    debounce(wait = 1400) {
        return this.decorate(debounce, wait);
    }

    /**
     * @returns {AppActionBuilder}
     */
    loading(loadingText, successText, errorText) {
        return this.decorate(loading, loadingText, successText, errorText);
    }


    /**
     * @returns {AppActionBuilder}
     */
    loading2({ processName, processingText, successText, errorText }) {
        return this.decorate(loading, processingText, successText, errorText);
    }

    /**
     * @returns {AppActionBuilder}
     */
    handleError(errorText) {
        return this.decorate(handleError, errorText);
    }

}

function action({ decorators = undefined } = {}) {
    return new AppActionBuilder(decorators);
}

export default action;