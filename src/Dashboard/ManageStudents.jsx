import React from "react";
import { supabase } from "../auth/client";
import { useEffect, useState } from "react";
import SearchStudents from "../components/SearchStudents";
import AddedStudentsList from "../components/AddedStudentsList";
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderAdvisor';
import '../stylings/managestudents.css';
import Footer from '../components/Footer';

const ManageStudents = ({ userId }) => {
    let navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("token")
        navigate('/')
    }

    const [students, setStudents] = useState([]);

  const fetchAddedStudents = async () => {
    const { data, error } = await supabase
      .from("advisor_students")
      .select("student_id, users:student_id(full_name, student_id)")
      .eq("advisor_id", userId);

    if (!error) {
      setStudents(data);
    } else {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAddedStudents();
    }
  }, [userId]);

    return (
        <div className="page-container">
            <Header handleLogout={handleLogout} />
            <div className="content-wrapper">
            <div className="manage-students">
                <div className="students-sidebar">
                    <AddedStudentsList advisorId={userId} students={students} onRemoveStudent={fetchAddedStudents} />
                </div>
                <div className="students-main">
                    <SearchStudents advisorId={userId} onStudentAdded={fetchAddedStudents} />
                    {/* <AddedStudentsList advisorId={userId} /> */}
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManageStudents;
