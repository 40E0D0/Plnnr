import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/client"; // Adjust the import path
import "../stylings/profilePage.css";
import Header from "../components/HeaderAdvisor";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) throw error;
  
        console.log("Complete User Object from Supabase:", user);
  
        const userId = user?.user?.id; // Adjusted based on actual response structure
        if (!userId) throw new Error("User ID not found.");
  
        console.log("Resolved User ID:", userId);
  
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();
  
        if (profileError) throw profileError;
  
        console.log("Profile fetched successfully:", profile);
        setUserData(profile);
        setFormData(profile);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        full_name: formData.full_name,
        email: formData.email,
        phone_no: formData.phone_no,
        institute: formData.institute,
      })
      .eq("id", userData.id);

    if (error) {
      console.error("Error updating profile: ", error);
    } else {
      setUserData({ ...formData });
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <Header handleLogout={handleLogout} />
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <div className="profile-field">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.full_name}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.phone_no}</span>
          )}
        </div>
        <div className="profile-field">
          <label>Institute:</label>
          {isEditing ? (
            <input
              type="text"
              name="institute"
              value={formData.institute}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.institute}</span>
          )}
        </div>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="bg-blue-700 text-white py-2 px-6 rounded-md hover:bg-blue-500 hover:text-white transition" onClick={handleSaveClick}>Save</button>
              <button className="bg-gray-400 text-black py-2 px-6 rounded-md hover:bg-gray-300 hover:text-black transition" onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button className="bg-blue-700 text-white py-2 px-6 rounded-full hover:bg-blue-500 hover:text-white transition" onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
