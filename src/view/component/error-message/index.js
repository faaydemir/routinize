import React from "react";
import "./style.scss"

const InputError = ({ errors, messageFormatter = undefined }) => {
    messageFormatter = messageFormatter ?? (e => e);
    return <>
        {errors && <small className="error-text">{messageFormatter(errors)}</small>}
    </>
}
export default InputError