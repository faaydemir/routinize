import React from "react";
import { useHistory } from "react-router-dom";
import { useStatefy } from "react-statefy";
import authState from "state/auth";
import "../style.scss"
import { register } from "view/page/auth/actions";
import SignUpForm from "view/page/auth/signin/component/signup";

const SignUp = () => {

    const { errors } = useStatefy(authState);
    const history = useHistory();
    return (
        <div className="auth-page-container">
            <SignUpForm
                onSignUp={({ email, password, passwordAgain }) => register({ email, password, passwordAgain, pushHistory: history.push })}
                errors={errors}
            />

        </div>)
}

export default SignUp;