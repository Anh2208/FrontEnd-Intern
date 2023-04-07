import React from "react";
import { Link} from 'react-router-dom'

const Repo = ({ repo }) => {
  // const { name, html_url, description, language } = repo;
  // const { name, html_url, description, stars, issues } = repo;
  const { name, html_url, description, stars, issues, owner } = repo;
   
  return (
    <div className="repo">
      <h3>
        Name :
        <a href={html_url}>{name}</a>
      </h3>
      <p>Description : {description}</p>
      {/* {language && <small>Written in {language}</small>} */}
      {<p>Stars : {stars}</p>}
      {<p>Open Issues : {issues}</p>}<br/>
      <Link to={`/repos/${owner.login}/${name}/commits`} className="link-commit">View Commits</Link>
    </div>
  );
};

export default Repo;
