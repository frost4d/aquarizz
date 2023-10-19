import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
      <LandingPage />
    </div>
  );
}

export default App;
