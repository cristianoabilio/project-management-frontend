import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function Layout() {
  const location = useLocation();

  const showNavBar = ["/","/login","/register"].includes(location.pathname);

  console.log(location.pathname);
  console.log(showNavBar);
  return(
    <>
      {showNavBar && <NavBar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route path="/projects"
            element={
              <ProtectedRoutes>
                <Projects />
              </ProtectedRoutes>
            }
          />

          <Route path="/projects/add"
            element={
              <ProtectedRoutes>
                <AddProject />
              </ProtectedRoutes>
            }
          />

          <Route path="/projects/edit/:id"
            element={
              <ProtectedRoutes>
                <EditProject />
              </ProtectedRoutes>
            }
          />

          <Route path="/tasks"
            element={
              <ProtectedRoutes>
                <Tasks />
              </ProtectedRoutes>
            }
          />
          <Route path="/task/add"
            element={
              <ProtectedRoutes>
                <AddTask />
              </ProtectedRoutes>
            }
          />
          <Route path="/task/edit/:id"
            element={
              <ProtectedRoutes>
                <EditTask />
              </ProtectedRoutes>
            }
          />
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