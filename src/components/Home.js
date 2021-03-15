import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../App";
import { auth, provider, fbprovider } from "../firebase";
function Home() {
  const data = useContext(authContext);
  useEffect(() => {
    const unsubscribe = data.auth.onAuthStateChanged((user) => {
      data.setcurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const history = useHistory();
  return (
    <div>
      <h2>Shubz</h2>
      {data.auth.currentUser == null ? (
        <div>
          <button onClick={() => history.push("/register")}>
            Register Here
          </button>
          <br></br>
          <button onClick={() => history.push("/login")}>Login Here</button>

          <br></br>
        </div>
      ) : (
        <button onClick={() => data.auth.signOut()}>Logout</button>
      )}
    </div>
  );
}

export default Home;
