import React, { useRef, useState } from 'react';
import './App.css';
// import './index.css'
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/firestore';
import ChatRoom from './components/ChatRoom'
import 'firebase/auth';
import Login from './components/Login';
import config from './secrets.json'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
firebase.initializeApp(config)
const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <Switch>
        <Route path="/" exact children={<Login firebase={firebase} auth={auth} loggedIn={user ? true : false} />} />
        <Route path="/rooms/:id" children={user ? <ChatRoom auth={auth} firestore={firestore} firebase={firebase} /> : <Login firebase={firebase} auth={auth} loggedIn={user ? true : false} />} />
      </Switch>
    </Router>
  );
}
export default App;
