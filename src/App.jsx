import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './auth/Register/Register';
import StudentRegister from './auth/Register/StudentRegister';
import AdvisorRegister from './auth/Register/AdvisorRegister';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/register/student" element={<StudentRegister />} />
                <Route path="/register/advisor" element={<AdvisorRegister />} />
            </Routes>
        </Router>
    );
}

export default App;
