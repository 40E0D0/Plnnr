import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import StudentRegister from './auth/Register/StudentRegister';
import AdvisorRegister from './auth/Register/AdvisorRegister';
import CoursePlanner from './Dashboard/CoursePlanner';
import { useEffect, useState } from 'react';

function App() {

    const [token, setToken] = useState(false)

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
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/student" element={<StudentRegister />} />
                <Route path="/register/advisor" element={<AdvisorRegister />} />
                {token?<Route path="/dashboard/planner" element={<CoursePlanner token={token}/>} />:""}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
