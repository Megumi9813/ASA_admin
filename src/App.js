import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.scss";
import Students from "./pages/students/Students";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import New from "./pages/new/New";
import { userInputs } from "./formSource";
import Profile from "./pages/profile/Profile";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            index
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <Students />
              </RequireAuth>
            }
          />
          <Route
            path="/students/new"
            element={
              <RequireAuth>
                <New inputs={userInputs} title="Add New Student" />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
