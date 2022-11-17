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
import { useContext, useEffect, useState } from "react";
import New from "./pages/new/New";
import { userInputs } from "./formSource";
import Profile from "./pages/profile/Profile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Edit from "./pages/edit/Edit";
import UpdateWiting from "./pages/update writing/UpdateWiting";
import WritingQuestions from "./pages/writing question/WritingQuestions";
import { getAuth } from "firebase/auth";
import Teachers from "./pages/teachers/Teachers";
import AddCourses from "./pages/add courses/AddCourses";

function App() {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    const fetchDocById = async () => {
      const docRef = doc(db, "students", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentUserData(docSnap.data());
      } else {
        setCurrentUserData({});
        console.log("No such document!");
      }
    };
    fetchDocById();
    if (user) {
      setUserLoading(false);
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <RequireAuth>
          <Sidebar currentUserData={currentUserData} />
        </RequireAuth>
        <main>
          <Navbar currentUserData={currentUserData} />
          <div className="contents_container">
            <Routes>
              <Route
                path="/login"
                element={<Login currentUserData={currentUserData} />}
              />
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
                path="/teachers"
                element={
                  <RequireAuth>
                    <Teachers />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="/teachers/new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New Student" />
                  </RequireAuth>
                }
              ></Route> */}
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile currentUserData={currentUserData} />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/edit"
                element={
                  <RequireAuth>
                    <Edit
                      title="Update Account Info"
                      currentUserData={currentUserData}
                      inputs={userInputs}
                    />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/update/Writing"
                element={
                  <RequireAuth>
                    {userLoading ? (
                      ""
                    ) : (
                      <UpdateWiting title="Add Writing Question" user={user} />
                    )}
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/questions/writing"
                element={
                  <RequireAuth>
                    <WritingQuestions />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/courses/add"
                element={
                  <RequireAuth>
                    <AddCourses />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
