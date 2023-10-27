import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/main/LandingPage";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";
import RegisterModal from "./components/RegisterModal";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/RegisterModal" element={<RegisterModal />} />
        </Routes>
      </Router>
      <LandingPage />
    </div>
  );
}

export default App;

