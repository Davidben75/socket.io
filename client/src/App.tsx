import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import ChatApp from "./pages/ChatApp";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/application" element={<ChatApp />} />
      </Routes>
    </Router>
  )
}

export default App;
