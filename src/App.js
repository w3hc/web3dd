import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from "./components/Homepage";
import Explorer from "./components/Explorer";

const App = () => {
  return (
    <Router basename={'/'}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explorer" element={<Explorer />} />
      </Routes>
    </Router>
  );
};

export default App;
