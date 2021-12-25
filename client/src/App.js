import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import { Login, SignUp } from "./components/Login";
import { useAuth } from "./hooks/useAuth";
function App() {
  // const checkToken = localStorage.getItem("token");
  const { token } = useAuth();

  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {!token && <Route path="/signin" element={<Login />} />}
          {!token && <Route path="/signup" element={<SignUp />} />}
          {token && <Route path="/chat" element={<Chat />} />}
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
