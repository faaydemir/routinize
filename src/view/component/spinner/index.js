import React from 'react'
import "./style.scss"
const Spinner = ({ isVisible }) => {
    return isVisible ? (<div className="spinner"><div></div></div>) : null
}

export default Spinner
