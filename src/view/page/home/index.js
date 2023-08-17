import React from "react";
import AddButton from "view/component/add-button"
import { editTask } from "view/page/home/actions";
import { logout, deleteUser } from "view/page/auth/actions";
import Calendar from "view/page/home/parts/calendar";
import ProfileButton from "view/page/home/components/profile-button";
import EditTask from "view/page/home/parts/edit";
import Log from "view/page/home/parts/log/log";

const Home = () => {

    return (
        <div className="container">
            <div className="fit-content">
                <Calendar />
                <AddButton onClick={() => editTask()}></AddButton>
                <ProfileButton onLogout={() => logout()} onDeleteMe={() => deleteUser()} />
            </div>
            <EditTask />
            <Log />
        </div>
    );
}

export default Home;