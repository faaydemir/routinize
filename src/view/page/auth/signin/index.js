import { useStatefy } from "core/statefy";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import authState from "state/auth";
import { login } from "view/page/auth/actions";
import Landing from "view/page/auth/signin/component/landing";
import SignInForm from "view/page/auth/signin/component/signin";


const SignIn = () => {
  const history = useHistory();
  const { errors } = useStatefy(authState);
  return <div className="auth-page-container">
    <Landing />
    <div className="signin flex-column flex-align-center">
      <SignInForm onSignIn={({ email, password }) => login({ email, password, pushHistory: history.push })} errors={errors} />
      <Link className="link-new-account" to='/signup' > create new account</Link>
    </div>
  </div>
}

export default SignIn;