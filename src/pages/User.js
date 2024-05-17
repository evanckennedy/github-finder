import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function User() {
  const { username } = useParams(); // get the username from the URL
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const options = useMemo(() => ({headers: { Authorization: `Bearer ${token}`}}), [token]);

  useEffect(() => {
    const getUserAndRepos = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        setUser(userResponse.data);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(reposResponse.data);
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }    
    }

    getUserAndRepos();
  }, [username, options]);

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'short', day: '2-digit'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  if (loading) { // if loading is true, display a loading message
    return <div className="loader"></div>;
  }

  if (error) { // if error is true, display an error message
    return <h2 className='fetch-error-message'>Failed to fetch user data</h2>;
  }

  return (
    <>
      <section className='user-container flex flex-column gap-40'>
        <div className="public-info flex flex-column gap-15">
          <img src={user.avatar_url} alt="avatar" />
          <p className='user-name'>{user.name}</p>
          <div className="flex gap-15">
            <div className='flex flex-column user-info'>
              <span>{user.public_repos}</span>
              <span>repositories</span>
            </div>
            <div className='flex flex-column user-info'>
              <span>{user.followers}</span>
              <span>followers</span>
            </div>
            <div className='flex flex-column user-info'>
              <span>{user.following}</span>
              <span>following</span>
            </div>
          </div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            <div className='github-link center'>Go to GitHub</div>
          </a>
        </div> 
        <div className="repos-wrapper flex flex-column gap-10">
          <h2>Repositories</h2>
          {repos.map(repo => (
            <div key={repo.id} className='repo-container flex flex-column'>
              <div className="flex justify-between">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='repo-name'
                  >{repo.name}
                </a>
                <span className='repo-date'>Updated at {formatDate(repo.updated_at)}</span>
              </div>
              {repo.description && <p className='repo-description'>{repo.description}</p>}
            </div>
          ))}
        </div>
      </section> 
    </>
  )
}

export default User;