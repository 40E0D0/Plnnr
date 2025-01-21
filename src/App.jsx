import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/Login/Login';
import ForgotPassword from './auth/ResetPassword/ForgotPassword';
import ResetPassword from './auth/ResetPassword/ResetPassword';
import Register from './auth/Register/Register';
import StudentRegister from './auth/Register/StudentRegister';
import AdvisorRegister from './auth/Register/AdvisorRegister';
import StudentDashboard from './Dashboard/StudentDashboard';
import AdvisorDashboard from './Dashboard/AdvisorDashboard';
import CoursePlanner from './Dashboard/CoursePlanner';
import AdvisorProfile from './Dashboard/AdvisorProfile';
import AdvisorPlanner from './Dashboard/AdvisorPlanner';
import ChatAdvisor from './Dashboard/ChatAdvisor';
import Chat from './Dashboard/Chat';
import FeedbackHub from './Dashboard/FeedbackHub';
import { useEffect, useState } from 'react';

function App() {

    const [token, setToken] = useState(false)
    const [userRole, setUserRole] = useState(null);  // New state for user role

    if(token){
        sessionStorage.setItem("token", JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem("token")){
            let data = JSON.parse(sessionStorage.getItem("token"))
            setToken(data)
        }

    }, [])
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} setUserRole={setUserRole} />} />
                <Route path="/i-forgot" element={<ForgotPassword />} />
                <Route path="/forgot-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/student" element={<StudentRegister />} />
                <Route path="/register/advisor" element={<AdvisorRegister />} />
                {token?<Route path="/dashboard-s" element={<StudentDashboard token={token}/>} />:""}
                {token?<Route path="/dashboard-a" element={<AdvisorDashboard token={token}/>} />:""}
                {token?<Route path="/dashboard/planner" element={<CoursePlanner token={token}/>} />:""}
                {token?<Route path="/dashboard/advisor-planner" element={<AdvisorPlanner token={token}/>} />:""}
                {token?<Route path="/account/profile" element={<AdvisorProfile token={token}/>} />:""}
                {token?<Route path="/chat-student" element={<Chat token={token}/>} />:""}
                {token?<Route path="/chat-advisor" element={<ChatAdvisor token={token}/>} />:""}
                {token?<Route path="/feedback-hub" element={<FeedbackHub token={token}/>} />:""}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
