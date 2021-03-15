import React, { useContext, useEffect } from "react";
import "./Register.css";
import { authContext } from "../App";
import { Link, useHistory } from "react-router-dom";
function Register() {
  const data = useContext(authContext);
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = data.auth.onAuthStateChanged((user) => {
      data.auth.signOut();
    });
    return unsubscribe;
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    console.log(e.target.mail.value);
    console.log(e.target.password.value);
    console.log(e.target.confirmpassword.value);
    console.log(e.target.gender.value);
    await data.auth.createUserWithEmailAndPassword(
      e.target.mail.value,
      e.target.password.value
    );
    console.log(data.db);
    await data.auth.currentUser.sendEmailVerification();
    await data.db.collection("userdata").doc(e.target.mail.value).set({
      username: e.target.username.value,
      gender: e.target.gender.value,
    });
    console.log("user successfully created");
    history.push("/login");
  };
  return (
    <div className="reg-contain">
      <h2>Create account here</h2>
      <form onSubmit={handlesubmit}>
        <label htmlFor="username">Enter username : </label>
        <input type="text" name="username" id="username" />
        <br></br>
        <label htmlFor="mail">Enter email : </label>
        <input type="email" name="mail" id="mail" />
        <br></br>
        <label htmlFor="password">Enter password : </label>
        <input type="password" name="password" id="password" />
        <br></br>
        <label htmlFor="confirmpassword">Confirm password : </label>
        <input type="password" name="confirmpassword" id="confirmpassword" />
        <br></br>
        <label>Gender :</label>
        <label>
          Male
          <input type="radio" name="gender" id="gender1" value="male" />
        </label>
        <label>
          Female
          <input type="radio" name="gender" id="gender2" value="female" />
        </label>
        <br></br>
        <small>
          Already a member <Link to="/login">Click here</Link>
        </small>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Register;
