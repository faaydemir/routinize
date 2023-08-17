import React from "react";
import "./style.scss"
const IconButton = ({ icon, ...props }) => {

    return (
        <button className="button-icon" {...props}>
            <i className="material-icons">{icon}</i>
        </button >
    )
}

export default IconButton