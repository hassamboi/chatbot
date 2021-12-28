import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import { useAuth } from "./hooks/useAuth";
import Register from "./pages/Register";
function App() {
  const { token } = useAuth();

  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {!token && <Route path="/register" element={<Register />} />}
          {token && <Route path="/chat" element={<Chat />} />}
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
