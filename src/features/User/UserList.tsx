import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, incrementPage, decrementPage } from '../../store/userSlice';
import { RootState, useAppDispatch } from '../../store/store';
import UserCard from './UserCard'; // Убедитесь, что путь к UserCard правильный

interface User {
  login: string;
  avatar_url: string;
  type: string;
}

interface UserListProps {
  query: string;
}

/**
 * Компонент списка пользователей
 */
const UserList: React.FC<UserListProps> = ({ query }) => {
  const dispatch = useAppDispatch();
  
  // Извлекаем данные из состояния Redux
  const { users, loading, error, page } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (query) {
      dispatch(fetchUsers(query));
    }
  }, [dispatch, query, page]);

  const handleNextPage = () => {
    dispatch(incrementPage());
  };

  const handlePrevPage = () => {
    dispatch(decrementPage());
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div>
        {users.map((user: User) => (
          <UserCard key={user.login} user={user} />
        ))}
      </div>
      <button onClick={handlePrevPage} disabled={page === 1}>Назад</button>
      <button onClick={handleNextPage}>Далее</button>
    </div>
  );
};

export default UserList;