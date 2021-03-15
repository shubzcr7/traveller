import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../App";

function Login() {
  const [loading, setLoading] = useState("inline-block");
  const data = useContext(authContext);
  const history = useHistory();
  // useEffect(() => {
  //   const unsubscribe = data.auth.onAuthStateChanged((user) => {
  //     data.auth.signOut();
  //   });

  //   return unsubscribe;
  // }, []);
  const handlesubmit = async (e) => {
    setLoading("none");
    e.preventDefault();
    try {
      await data.auth.signInWithEmailAndPassword(
        e.target.mail.value,
        e.target.password.value
      );
      console.log("Successfully signed in");
      setLoading("inline-block");
      history.push("/profile");
    } catch {
      alert("Unable to sign in");
      setLoading("inline-block");
      history.push("/login");
    }
  };

  return (
    <div className="reg-contain" style={{ display: loading }}>
      <h2>Login here</h2>
      <form onSubmit={handlesubmit}>
        <label htmlFor="mail">Enter email : </label>
        <input type="email" name="mail" id="mail" />
        <br></br>
        <label htmlFor="password">Enter password : </label>
        <input type="password" name="password" id="password" />
        <br></br>
        <small>
          Need an account <Link to="/register">Click here</Link>
        </small>
        <br></br>
        <button>Submit</button>
        <br></br>
      </form>
    </div>
  );
}

export default Login;
