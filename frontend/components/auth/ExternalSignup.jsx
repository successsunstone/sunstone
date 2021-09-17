import React from 'react';
import { Link } from 'react-router-dom';
import { FiUserCheck } from "react-icons/fi";

const ExternalSignup = ({ changeView, demoLogin, animate }) => (
  <div className={animate ? 'animated auth-form' : 'auth-form'}>
    <h1>
      Design anything.
      <br />
      Publish anywhere.
    </h1>
    <button type="button" onClick={demoLogin} className="demo btn-outline">
      <i>
        <FiUserCheck />
      </i>
      <span>Log in as Demo User</span>
    </button>
    <button type="button" className="btn-blue" onClick={changeView}>
      Sign up with E-mail
    </button>
    <small>
      Already signed up?&nbsp;
      <Link to="/login">Log in</Link>
    </small>
  </div>
);

export default ExternalSignup;
