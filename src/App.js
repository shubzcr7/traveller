import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
//import { increment, signin } from "./actions/index";
//import C from "./components/C";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Login from "./components/Login";
import { auth, provider, fbprovider, db, storage } from "./firebase";
import Profile from "./components/Profile";
//export const loginContext = React.createContext();
export const authContext = React.createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setcurrentUser] = useState("");
  const history = useHistory();
  console.log(storage.ref());
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     console.log(auth.currentUser);
  //     console.log(user);
  //     setcurrentUser(user);
  //   });
  //   return unsubscribe;
  // }, []);
  //const counter = useSelector((state) => state.counter);
  //const logstatus = useSelector((state) => state.isLogged);
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setcurrentUser(user);
  //   });
  //   return unsubscribe;
  // }, []);
  return (
    <Router>
      <div className="App">
        <Nav auth={auth} />

        <authContext.Provider
          value={{
            auth: auth,
            setcurrentUser: setcurrentUser,
            db: db,
            storage: storage,
          }}
        >
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile} />
            </Switch>
          </div>
        </authContext.Provider>
        {/* <button onClick={() => dispatch(increment(5))}>+</button>
      <button>-</button>
      Counter {counter}
      <button onClick={() => dispatch(signin())}>Press to Login in</button>
      <h2>Logging status {logstatus}</h2>
      <loginContext.Provider value={logstatus}>
        <C />
      </loginContext.Provider> */}
      </div>
    </Router>
  );
}

export default App;
