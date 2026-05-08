import React from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "./pages/Home";
import  Career  from "./pages/Career";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/career"
        element={<Career />}
      />
    </Routes>
  );
};

export default App;