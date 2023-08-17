import React, { useState, useEffect } from "react";
import "core/firebase/firebase";

import { Route, Switch } from 'react-router-dom'

import Spinner from "./view/component/spinner";
import authState, { loginSucceed } from "state/auth";
import { useStatefy } from "core/statefy";
import Home from "view/page/home";
import SignIn from "view/page/auth/signin";
import SignUp from "view/page/auth/signup";
import "./styles.scss";
import { getUser } from "core/firebase/auth/session";


export default function App() {

  const { isAuthenticated } = useStatefy(authState, 'isAuthenticated');
  useEffect(() => {
    const checkAuthentication = async () => {
      const user = await getUser();
      if (user) loginSucceed(user.email);
    }
    checkAuthentication();
  }, []);

  return (
    <Switch>
      <Route path='/signin' render={() => isAuthenticated ? <Home /> : <SignIn />} />
      <Route path='/signup' render={() => isAuthenticated ? <Home /> : <SignUp />} />
      <Route path='/' render={() => isAuthenticated ? <Home /> : <SignIn />} />
    </Switch>
  );
}

