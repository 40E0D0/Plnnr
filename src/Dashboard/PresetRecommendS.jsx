import { useEffect, useState } from "react";
import { supabase } from "../auth/client"; // Ensure you have the Supabase client set up
import { useNavigate } from "react-router-dom";
import PresetRecommendations from "../components/PresetRecommendations";
import Header from "../components/Header";

const PresetScreen = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase.from("courses").select("*");
            if (error) {
                console.error("Error fetching courses:", error);
            } else {
                setCourses(data);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <Header handleLogout={handleLogout} />
            <PresetRecommendations courses={courses} />
        </div>
    );
};

export default PresetScreen;
