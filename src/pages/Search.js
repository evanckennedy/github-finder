import { FaGithub } from 'react-icons/fa';
import { useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/* 
  This hook is useful when you want to redirect the user after an event, 
  like form submission.
*/

function Search() {
  const [username, setUsername] = useState('');
  const [userFound, setUserFound] = useState(true);

  const navigate = useNavigate();

  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const options = useMemo(() => ({headers: { Authorization: `Bearer ${token}`}}), [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    try {
      const response = await axios.get(`https://api.github.com/users/${trimmedUsername}`, options);
      if (response.status === 200) {
        setUserFound(true);
        navigate(`/user/${trimmedUsername}`); // navigate to the user page
      }
    } catch (error) {
      setUserFound(false)
    }
  }

  return (
    <>
      <section className="search-container center">
        <div className="search-content flex flex-column">
          <div className="github-icon">
            <FaGithub color='var(white)'/>
          </div>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              placeholder='username'
            />
          </form>
          <p className={`input-message ${userFound ? '' : 'not-found-message'}`}>
            {userFound ? 'Welcome to GitHub Finder' : 'User not found'}
          </p>
        </div>
      </section>
      
    </>
  )
}

export default Search