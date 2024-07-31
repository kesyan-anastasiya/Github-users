import React from 'react';
import { useState } from "react";

function Home(): JSX.Element {
  const [query, setQuery] = useState("");
  console.log(query)

  return (
    <>
      <input
        type="text"
        placeholder="Find github user"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
      {query && <UserList query={query} />}
    </>
  );
}

export default Home;