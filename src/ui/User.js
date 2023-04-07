import React from "react";
import { Link } from "react-router-dom";
import '../pages/User/User.css'

const User = ({ user }) => {
  const { avatar_url, login, id } = user;
  return (
    <div className="container">
      <Link to={`/user/${login}`}>
      <div className="user ">
        <div className="image-ui">
          <img src={avatar_url} alt={login} />
        </div>
        <div className="user-info">
          <h3>{login}</h3>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default User;
