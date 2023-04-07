import "../src/App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User/User";
import Commits from './ui/Commits'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:login" element={<User />} />
        <Route path="/repos/:username/:repoName/commits" element={<Commits/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
