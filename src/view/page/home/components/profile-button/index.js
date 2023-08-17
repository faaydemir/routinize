import React from 'react'
import IconButton from 'view/component/icon-button';
import "./style.scss"

const ProfileButton = ({ onLogout, onDeleteMe }) => {

    return (
        <div className="profile-menu">
            <IconButton className="profile-button button" icon="person">
            </IconButton>
            <nav className="nav">
                <ul>
                    <a href="#" onClick={onLogout}>Logout</a>
                </ul>
                <ul>
                    <a href="#" onClick={onDeleteMe}>!Delete Me</a>
                </ul>
            </nav>
        </div >
    )
}

export default ProfileButton;