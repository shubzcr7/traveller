import lion from "../lion.jpg";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../App";
import "./Nav.css";
function Nav(props) {
  const data = useContext(authContext);
  console.log(props);
  if (props.auth.currentUser == null) {
    return (
      <header className="head">
        <ul className="nav-items">
          <li className="item" id="item1">
            <img src={lion} style={{ width: "3em", height: "3em" }} />
          </li>

          <li className="item" id="item2">
            <Link to="/" className="links">
              Home
            </Link>
          </li>

          <li className="item" id="item3">
            About us
          </li>
          <li className="item" id="item4">
            Contact us
          </li>
        </ul>
      </header>
    );
  } else {
    return (
      <header className="head">
        <ul className="nav-items">
          <li className="item" id="item1">
            <img src={lion} style={{ width: "3em", height: "3em" }} />
          </li>

          <li className="item" id="item2">
            <Link to="/" className="links">
              Home
            </Link>
          </li>

          <li className="item" id="item5">
            <Link to="/profile" className="links">
              Profile
            </Link>
          </li>
          <li className="item" id="item3">
            <Link to="/" className="links" onClick={() => props.auth.signOut()}>
              Logout
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Nav;
