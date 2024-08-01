import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface UserDetails {
  avatar_url: string;
  login: string;
  type: string;
  name: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
}

function UserPage(): JSX.Element {
  const { login } = useParams<{ login: string }>();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (login) {
      axios
        .get(`https://api.github.com/users/${login}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [login]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User is not found.</div>;
  }

  return (
    <div>
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.login}</h2>
      <p>Type: {user.type}</p>
      <p>Name: {user.name}</p>
      <p>Bio: {user.bio}</p>
      <p>Location: {user.location}</p>
      <p>
        Blog: <a href={user.blog}>{user.blog}</a>
      </p>
      <p>Company: {user.company}</p>
    </div>
  );
}

export default UserPage;