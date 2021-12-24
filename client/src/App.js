import "./App.css";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import { About, Help, Landing, Services, Chat } from "./pages";
import { Login, SignUp } from "./components/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
const checkToken = localStorage.getItem('token')
  return (
    <div className="main">
      <BrowserRouter>
      <AuthProvider>``
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<Help />} />
          {checkToken && <Route path="/chat" element={<Chat />} />}
          <Route path ="*" element={<Landing/>}/>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
