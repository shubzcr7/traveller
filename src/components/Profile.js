import React, { useState, useEffect, useContext, useRef } from "react";
import { authContext } from "../App";
import { useHistory } from "react-router-dom";
import "./Profile.css";
function Profile() {
  const [username, setUsername] = useState("");
  const data = useContext(authContext);
  const history = useHistory();
  const displayName = useRef();
  const photoUrl = useRef();
  const newpassword = useRef();
  const confirmnewpassword = useRef();
  const renewemail = useRef();
  useEffect(() => {
    const unsubscribe = data.auth.onAuthStateChanged((user) => {
      if (user.emailVerified == false) {
        console.log("Signing out forcefully");
        data.auth.signOut();
        alert("please verify email address");
        history.push("/");
      }
      var docRef = data.db
        .collection("userdata")
        .doc(data.auth.currentUser.email);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log(doc.data().username);
            setUsername(doc.data().username);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
      data.setcurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handlesubmit = (e) => {
    data.auth.currentUser
      .updateProfile({
        displayName: displayName.current.value,
        photoURL: photoUrl.current.value,
      })
      .then(() => {
        alert("Updated succcessfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handlepasssubmit = async () => {
    if (newpassword.current.value !== confirmnewpassword.current.value) {
      return alert("passwords not match");
    }
    await data.auth.currentUser
      .updatePassword(newpassword.current.value)
      .then(() => {
        alert("Password updated successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const newemailhandler = () => {
    data.auth.currentUser
      .updateEmail(renewemail.current.value)
      .then(() => {
        data.auth.currentUser.sendEmailVerification();
      })
      .then(() => {
        data.auth.signout();
      })
      .then(() => {
        history.push("/");
      });
  };

  const handledeletesubmit = () => {
    let m = prompt("Enter your email");
    if (data.auth.currentUser.email == m) {
      data.db
        .collection("userdata")
        .doc(data.auth.currentUser.email)
        .delete()
        .then(() => {
          data.auth.currentUser
            .delete()
            .then(() => {
              alert("Your account has been deleted");

              history.push("/");
            })
            .catch((e) => {
              alert(e);
            });
        });
    } else {
      alert("please provide correct email");
    }
  };

  return (
    <div>
      <h2>Welcome {username}</h2>
      <br />

      <h1>Update User info</h1>
      <label>
        Add display name :
        <input type="text" ref={displayName} />
      </label>
      <br />
      <label>
        Enter photo URL :
        <input type="url" ref={photoUrl} />
      </label>
      <br />
      <button onClick={handlesubmit}>Update</button>
      <h1>Update password info </h1>
      <label>
        Password :
        <input type="password" ref={newpassword} />
      </label>
      <br />
      <label>
        Confirm new password :
        <input type="password" ref={confirmnewpassword} />
      </label>
      <br />
      <button onClick={handlepasssubmit}>Update new password</button>
      <h2>Update email</h2>
      <label>
        Enter new email
        <input type="email" ref={renewemail} />
      </label>
      <button onClick={newemailhandler}>Submit</button>
      <br />
      <br />
      <button style={{ backgroundColor: "red" }} onClick={handledeletesubmit}>
        Delete account
      </button>
      {/* <button onClick={handletry}>Try</button> */}
    </div>
  );
}

export default Profile;
