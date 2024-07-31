import React from 'react';
import Home from "../features/Home/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App(): JSX.Element {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="user/:login" element={<UserPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
