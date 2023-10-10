import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users/Users";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./pages/UserProfile/UserProfile";
import Links from "./pages/Links/Links";
import User from "./pages/User/User";
function App() {
  return (
    <div className="bg-slate-100 h-screen overflow-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/links" element={<Links />} />
        <Route path="/user/:userId" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
