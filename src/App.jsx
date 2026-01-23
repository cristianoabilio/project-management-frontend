import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Layout() {
  const location = useLocation();

  const showNavBar = ["/","/login","/register"].includes(location.pathname);

  console.log(location.pathname);
  console.log(showNavBar);
  return(
    <>
      {showNavBar && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App;