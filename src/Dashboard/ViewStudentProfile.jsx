// ViewStudentProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../auth/client";
import Avatar from "../assets/default-avatar.png";
import Header from "../components/HeaderAdvisor";
import "../stylings/profilePage.css";

const ViewStudentProfile = () => {
  //const { studentId } = useParams(); // Assuming route like /view-student/:studentId
  const { uuid } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("full_name, email, phone_no, student_id, level_study, institute, avatar_url")
        .eq("id", uuid) // Or `.eq("id", uuid)` if you're using UUIDs
        .single();

      if (error) {
        console.error("Error fetching student profile:", error.message);
      } else {
        setStudentData(data);
      }
    };

    if (uuid) fetchStudentData();
  }, [uuid]);

  if (!studentData) return <p>Loading student profile...</p>;

  return (
    <div>
      <Header />
      <div className="profile-page">
        <h1 className="font-bold underline">Student Profile</h1>
        <div className="profile-card">
          <div className="avatar-container">
            <img
              src={studentData.avatar_url || Avatar}
              alt="Student Avatar"
              className="avatar-preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>

          <div className="profile-field"><label>Full Name:</label> <span>{studentData.full_name}</span></div>
          <div className="profile-field"><label>Student ID:</label> <span>{studentData.student_id}</span></div>
          <div className="profile-field"><label>Email:</label> <span>{studentData.email}</span></div>
          <div className="profile-field"><label>Phone:</label> <span>{studentData.phone_no}</span></div>
          <div className="profile-field"><label>Institute:</label> <span>{studentData.institute}</span></div>
          <div className="profile-field"><label>Level of Study:</label> <span>{studentData.level_study}</span></div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentProfile;
