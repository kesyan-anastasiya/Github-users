import React, { useEffect, useState } from "react";
import UserList from "../User/UserList";
import { useAppDispatch } from "../../store/store";
import { fetchUsers } from "../../store/userSlice";

function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchUsers(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <>
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={handleSearch}
      />
      <UserList query={searchTerm} />
    </>
  );
}

export default Home;