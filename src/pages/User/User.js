import React, { useState, useEffect } from "react";
import "./User.css";
import site from "../../assets/site.png";
import github from "../../assets/github.png";
import location from "../../assets/location.png";
import user from "../../assets/user.png";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";
import Repo from "../../ui/Repo";

// const token = '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';// your token

// const options = {
//   headers: { 'Authorization': `Bearer ${token}` }
// };


const User = () => {
  const { login } = useParams();
  
  //UserInformation
  const [userInfo, setUserInfo] = useState({});
  // User repos
  const [repos, setRepos] = useState([]);
  // Commits
  // const [commits, setCommits] = useState([]);   

  useEffect(() => {
  const fetchUserInformation = async () => {
    try {
      const response = await Promise.all([
        // axios.get(`/users/${login}`, options),
        // axios.get(`/users/${login}/repos`, options),
        axios.get(`/users/${login}`),
        axios.get(`/users/${login}/repos`),
      ]);
      // console.log(response);
      setUserInfo(response[0].data);
      // Call GitHub API to get stars and issues count for each repo
      const reposWithStarAndIssues = await Promise.all(
        response[1].data.map(async (repo) => {
          // const { data } = await axios.get(repo.url, options);
          const { data } = await axios.get(repo.url);
          const { stargazers_count, open_issues_count } = data;
          console.log(response[0])
          return {
            ...repo,
            stars: stargazers_count,
            issues: open_issues_count,
            
          };
      
        })
      );
      setRepos(reposWithStarAndIssues);

    } catch (error) {
      console.error(error);
    }
  };
  fetchUserInformation();
}, []);

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="user-information">
        <div className="image">
          <img src={userInfo?.avatar_url} />
        </div>
        <div className="user-content">
          <h1>{userInfo?.name}</h1>
          <p>{userInfo?.bio}</p>
          <div className="more-data">
            <p>
              <img src={user} alt="" />
              {userInfo?.followers} Followers. Following {userInfo?.following}
            </p>
            {userInfo?.location && (
              <p>
                <img src={location} alt="" />
                {userInfo?.location}
              </p>
            )}
            {userInfo?.blog && (
              <p>
                <img src={site} alt="" />
                {userInfo?.blog}
              </p>
            )}
            <p>
              <img src={github} alt="" />
              <a href={userInfo?.html_url}>View GitHub Profile</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user-repos">
        {repos ? (
          repos.map((repo) => {
            return <Repo repo={repo} key={repo.id} />;
          })
        ) : (
          <h2>No repos for this user...</h2>
        )}
      </div>
     

    </div>
  );
};

export default User;


// {commits.length > 0 && (
//   <div className="user-commits">
//     <h2>Latest Commits</h2>
//     <ul>
//       {commits.map((commit) => (
//         <li key={commit.sha}>
//           <a href={commit.html_url} target="_blank" rel="noreferrer">
//             {commit.commit.message}
//           </a>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}