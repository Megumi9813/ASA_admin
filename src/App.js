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
import { userInputs } from "./formSource";
import Profile from "./pages/profile/Profile";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Edit from "./pages/edit/Edit";
import UpdateWiting from "./pages/update writing/UpdateWiting";
import WritingQuestions from "./pages/writing question/WritingQuestions";
import { getAuth } from "firebase/auth";
import Teachers from "./pages/teachers/Teachers";
import AddCourses from "./pages/add courses/AddCourses";
import WritingReview from "./pages/writing review/WritingReview";
import NewStudent from "./pages/new student/NewStudent";
import NewTeacher from "./pages/new teacher/NewTeacher";
import UpdateSpeaking from "./pages/update speaking/UpdateSpeaking";
import AddCelpipWriting from "./pages/add celpip writing/AddCelpipWriting";
import SpeakingReview from "./pages/speaking review/SpeakingReview";
import AddIeltsWriting from "./pages/add ielts writing/AddIeltsWriting";
import SubmittedAnswers from "./pages/submitted answers/SubmittedAnswers";
import AddIeltsSpeaking from "./pages/add ielts speaking/AddIeltsSpeaking";
import ViewCourse from "./pages/view course/ViewCourse";
import StudentProfile from "./pages/student profile/StudentProfile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUserData, setCurrentUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  useEffect(() => {
    const fetchDocById = async () => {
      const docRef = doc(db, "teachers", currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentUserData(docSnap.data());
      } else {
        setCurrentUserData({});
      }
    };
    fetchDocById();
    // if (user) {
    //   setUserLoading(false);
    // }
    const fetchSubmittedAnswers = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "submittedAnswer"));
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            answer1: doc.data().answer1,
            answer2: doc.data().answer2,
            questionId: doc.data().questionId,
            ...doc.data(),
          });
        });
        setSubmittedAnswers(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSubmittedAnswers();

    const fetchCourses = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCourses(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();

    const fetchStudents = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        querySnapshot.forEach((doc) => {
          list.push(doc.id);
        });
        setStudents(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  }, [user]);

  const submittedSpeakingPath = submittedAnswers.filter(
    (item) =>
      item.courseType === "CELPIP Speaking" ||
      item.courseType === "IELTS Speaking"
  );

  const submittedWritingPath = submittedAnswers.filter(
    (item) =>
      item.courseType === "CELPIP Writing" ||
      item.courseType === "IELTS Writing"
  );

  // console.log(submittedAnswers);

  return (
    <div className="App">
      <Router>
        <Sidebar currentUserData={currentUserData} />
        <main>
          <Navbar currentUserData={currentUserData} />
          <div className="contents_container">
            <Routes>
              <Route
                path="/login"
                element={<Login currentUserData={currentUserData} />}
              />
              <Route path="/" index element={<Home />} />
              <Route path="/students" element={<Students />} />
              <Route
                path="/students/new"
                element={
                  <NewStudent inputs={userInputs} title="Add New Student" />
                }
              ></Route>
              <Route path="/teachers" element={<Teachers />} />
              <Route
                path="/teachers/new"
                element={
                  <RequireAuth>
                    <NewTeacher inputs={userInputs} title="Add New Teacher" />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/profile"
                element={<Profile currentUserData={currentUserData} />}
              ></Route>
              <Route
                path="/edit"
                element={
                  <Edit
                    title="Update Account Info"
                    currentUserData={currentUserData}
                    inputs={userInputs}
                  />
                }
              ></Route>
              <Route
                path="/service/CELPIP-writing"
                element={
                  <RequireAuth>
                    <AddCelpipWriting
                      title="Add CELPIP Writing Question"
                      user={user}
                      currentUserData={currentUserData}
                    />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/service/IELTS-writing"
                element={
                  <RequireAuth>
                    <AddIeltsWriting
                      title="Add IELTS Writing Question"
                      user={user}
                      currentUserData={currentUserData}
                    />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/service/IELTS-speaking"
                element={
                  <RequireAuth>
                    <AddIeltsSpeaking
                      title="Add IELTS Speaking Question"
                      user={user}
                      currentUserData={currentUserData}
                    />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/update/Writing"
                element={
                  <RequireAuth>
                    <UpdateWiting title="Add Writing Question" user={user} />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/update/Speaking"
                element={
                  <RequireAuth>
                    {/* {userLoading ? (
                      ""
                    ) : ( */}
                    <UpdateSpeaking
                      title="Add CELPIP Speaking Question"
                      currentUserData={currentUserData}
                      user={user}
                    />
                    {/* )} */}
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/questions/writing"
                element={
                  // <RequireAuth>
                  <WritingQuestions />
                  // </RequireAuth>
                }
              ></Route>
              <Route
                path="/submitted/answers"
                element={<SubmittedAnswers currentUserData={currentUserData} />}
              ></Route>
              {submittedWritingPath.map((answer) => (
                <Route
                  path={answer.id}
                  element={
                    <WritingReview
                      currentUserData={currentUserData}
                      submittedAnswers={submittedAnswers}
                      questionId={answer.questionId}
                      submittedAnswerId={answer.id}
                      answer={answer}
                    />
                  }
                  key={answer.id}
                />
              ))}
              {submittedSpeakingPath.map((answer) => (
                <Route
                  path={answer.id}
                  key={answer.id}
                  element={
                    <SpeakingReview
                      currentUserData={currentUserData}
                      submittedAnswers={submittedAnswers}
                      questionId={answer.questionId}
                      submittedAnswerId={answer.id}
                      answer={answer}
                    />
                  }
                />
              ))}
              {courses.map((course) => (
                <Route
                  path={course.id}
                  key={course.id}
                  element={<ViewCourse course={course} />}
                />
              ))}
              {students.map((item, idx) => (
                <Route
                  path={item}
                  key={idx}
                  element={
                    <StudentProfile
                      studentId={item}
                      submittedAnswers={submittedAnswers}
                    />
                  }
                />
              ))}
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
