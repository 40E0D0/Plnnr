import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { supabase } from "./auth/client";
import Login from './auth/Login/Login';
import ForgotPassword from './auth/ResetPassword/ForgotPassword';
import ResetPassword from './auth/ResetPassword/ResetPassword';
import Register from './auth/Register/Register';
import StudentRegister from './auth/Register/StudentRegister';
import AdvisorRegister from './auth/Register/AdvisorRegister';
import StudentDashboard from './Dashboard/StudentDashboard';
import AdvisorDashboard from './Dashboard/AdvisorDashboard';
import CoursePlanner from './Dashboard/CoursePlanner';
import StudentProfile from './Dashboard/StudentProfile';
import AdvisorProfile from './Dashboard/AdvisorProfile';
import AdvisorPlanner from './Dashboard/AdvisorPlanner';
import ChatAdvisor from './Dashboard/ChatAdvisor';
import PresetRecommendS from './Dashboard/PresetRecommendS';
import Chat from './Dashboard/Chat';
import FeedbackHub from './Dashboard/FeedbackHub';
import FeedbackAdvisor from './Dashboard/FeedbackAdvisor';
import ManageStudents from './Dashboard/ManageStudents';
import ViewStudentProfile from './Dashboard/ViewStudentProfile';
import { useEffect, useState } from 'react';
import ManageStudentWrapper from "./components/ManageStudentWrapper"; // adjust path

function App() {

    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(false)
    const [userRole, setUserRole] = useState(null);  // New state for user role

    if (token) {
        sessionStorage.setItem("token", JSON.stringify(token))
    }

    /* useEffect(() => {
        if (sessionStorage.getItem("token")) {
            let data = JSON.parse(sessionStorage.getItem("token"))
            setToken(data)
        }

        const getUserId = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const user = sessionData?.session?.user;
            if (user) {
                setUserId(user.id);
            }
        };

        getUserId();

    }, []) */

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            let data = JSON.parse(sessionStorage.getItem("token"));
            setToken(data);
        }

        const getUserInfo = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                console.error("Error fetching user:", error.message);
                return;
            }

            if (user) {
                setUserId(user.id);
            }
        };

        getUserInfo();
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} setUserRole={setUserRole} />} />
                <Route path="/i-forgot" element={<ForgotPassword />} />
                <Route path="/forgot-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/student" element={<StudentRegister />} />
                <Route path="/register/advisor" element={<AdvisorRegister />} />
                {/* <Route path="/manage-students" element={<ManageStudents userId={currentUser.id} />} /> */}
                {token ? <Route path="/dashboard-s" element={<StudentDashboard token={token} />} /> : ""}
                {token ? <Route path="/dashboard-a" element={<AdvisorDashboard token={token} />} /> : ""}
                {token ? <Route path="/dashboard/planner" element={<CoursePlanner token={token} />} /> : ""}
                {token ? <Route path="/dashboard/advisor-planner" element={<AdvisorPlanner token={token} />} /> : ""}
                {token ? <Route path="/recommend/preset-s" element={<PresetRecommendS token={token} />} /> : ""}
                {/* {token ? <Route path="/manage-students" element={<ManageStudents token={token} />} /> : ""} */}
                <Route path="/manage-students" element={token ? <ManageStudentWrapper token={token} /> : <p>Please log in</p>} />
                <Route path="/view-student/:uuid" element={<ViewStudentProfile />} />
                {/* {token && userId ? (<Route path="/manage-students" element={<ManageStudents userId={userId} />} />) : ("")} */}
                {token ? <Route path="/account/profile-advisor" element={<AdvisorProfile token={token} />} /> : ""}
                {token ? <Route path="/account/profile-student" element={<StudentProfile token={token} />} /> : ""}
                {token ? <Route path="/chat-student" element={<Chat token={token} />} /> : ""}
                {token ? <Route path="/chat-advisor" element={<ChatAdvisor token={token} />} /> : ""}
                {token ? <Route path="/feedback-hub" element={<FeedbackHub token={token} />} /> : ""}
                {token ? <Route path="/feedback-hub-a" element={<FeedbackAdvisor token={token} />} /> : ""}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
