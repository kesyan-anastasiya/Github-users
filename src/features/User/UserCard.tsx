import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: {
    login: string;
    avatar_url: string;
    type: string;
  };
}

function UserCard({ user }:UserCardProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${user.login}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <img src={user.avatar_url} alt={user.login} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <h3>{user.login}</h3>
      <p>{user.type}</p>
    </div>
  );
}

export default UserCard;