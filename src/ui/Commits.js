import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ui.css'

const Commits = () => {
  // const { username, repoName } = useParams();
  const { username } = useParams();
  const { repoName } = useParams();

  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/commits`
      );
      console.log(response);
      setCommits(response.data.slice(0, 10));
    };
    fetchCommits();
  }, [username, repoName]);

  return (
    <div className="container">
      <div className="commit">
        <p>
          Commits for {username}/{repoName}
        </p>
        <ul>
          {commits.map((commit) => (
            <li key={commit.sha} className="commit-detail">
              <div>
                Author : <strong>{commit.author.login}</strong>:{" "}
              </div>
              <div>
                {" "}
                Message :
                <a href={commit.html_url} target="_blank" rel="noreferrer">
                  {commit.commit.message}
                </a>
              </div>
              <div>ID : ({commit.sha.slice(0, 7)})</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commits;
