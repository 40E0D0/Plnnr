import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../auth/client"; // Adjust the import path
import "../stylings/profilePage.css";
import Avatar from '../assets/default-avatar.png';
import Header from "../components/Header";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null); // State for storing selected avatar file
  const [avatarUrl, setAvatarUrl] = useState(null); // State for storing the uploaded avatar URL
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
    let newAvatarUrl = avatarUrl;

    // If a new avatar file is selected, upload it to Supabase Storage
    if (avatarFile) {
      const fileName = `${Date.now()}-${avatarFile.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("avatars") // You need to have created an 'avatars' bucket
        .upload(fileName, avatarFile);

      if (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        return;
      }

      // Get the URL of the uploaded file
      newAvatarUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`;
    }

    const { error } = await supabase
      .from("users")
      .update({
        full_name: formData.full_name,
        email: formData.email,
        phone_no: formData.phone_no,
        institute: formData.institute,
        avatar_url: newAvatarUrl, // Update the avatar_url as well
      })
      .eq("id", userData.id);

    if (error) {
      console.error("Error updating profile: ", error);
    } else {
      setUserData({ ...formData, avatar_url: newAvatarUrl });
      setIsEditing(false);
      setAvatarUrl(newAvatarUrl); // Set the new avatar URL in state
    }
  };

  const handleCancelClick = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <div className="profile-page">
        <h1 className="font-bold underline">Profile Page</h1>
        <div className="profile-card">

          {/* Avatar Display and Upload */}
          <div className="avatar-container">
            {isEditing ? (
              <input type="file" onChange={handleAvatarChange} />
            ) : (
              <img
                src={avatarUrl || Avatar} // Display the avatar or default image
                alt="Avatar"
                className="avatar-preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
          </div>

          {/* Other Profile Fields */}
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
            <label>Student ID:</label>
            {isEditing ? (
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.student_id}</span>
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
          <div className="profile-field">
            <label>Level of Study:</label>
            {isEditing ? (
              <input
                type="text"
                name="level_study"
                value={formData.level_study}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.level_study}</span>
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
