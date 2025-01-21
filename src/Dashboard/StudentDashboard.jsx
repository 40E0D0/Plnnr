import React from 'react';
import '../stylings/planner.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const StudentDashboard = ({token}) => {
    let navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem("token")
        navigate('/')
    }

   return (
    <div>
        <Header handleLogout={handleLogout} />
    <div className='planner-container'>
        <div>
            <h3>Welcome back, {token.user.user_metadata.full_name}.</h3>
            <p className='justify-center text-sm font-normal'>Right now this page is under construction, so please play with the header items and maybe there's something to explore there.</p>
            <p className='justify-center text-sm font-normal'>Stay tuned, 'cause there's going this page is where updates are displayed, tho still in planning.</p>
        </div>
    </div>
    </div>
    );
}

export default StudentDashboard;