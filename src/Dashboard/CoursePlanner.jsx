import React from 'react';
import '../stylings/planner.css';
import { useNavigate } from 'react-router-dom';

const CoursePlanner = ({token}) => {
    let navigate = useNavigate()

    function handleLogout(){
        sessionStorage.removeItem("token")
        navigate('/')
    }

   return (
    <div className='planner-container'>
        <div>
            <h3>Welcome back, {token.user.user_metadata.full_name}.</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
    );
}

export default CoursePlanner;