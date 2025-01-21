import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import DroppableArea from "../components/DroppableArea";
import DraggableCourse from "../components/Draggables";
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderAdvisor';
import '../stylings/planner.css';
import { supabase } from "../auth/client";

(async () => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) {
    console.error("Error testing Supabase query:", error);
  } else {
    console.log("Supabase query test result:", data);
  }
})();

const AdvisorPlanner = () => {
  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate('/');
  }

  const [sidebarCourses, setSidebarCourses] = useState([]);
  const [droppedCourses, setDroppedCourses] = useState([null, null, null, null, null, null, null]);

  // Define a mapping of categories to colors
  const categoryColors = {
    CORE: "#FFED85", // Yellow
    UCS: "#C393F1",  // Purple
    MPU: "#00CCCC",  // Teal
    ELECTIVE: "#1FC1EA", // Blue
    FYP: "#FFA500",  // Orange
    UCSL: "#32CD32",  // Green
    INTRA: "#FF99AB",  // Pink
    // Add more categories and colors as needed
  };

  // Fetch courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        console.log("Courses fetched:", data); // Debugging output
        setSidebarCourses(
          data.map(course => ({
            id: `course-${course.id}`, // Add unique identifier
            courseCode: course.course_code,
            courseName: course.course_name,
            lecturer: course.lecturer || "Not assigned",
            prerequisite: course.prerequisite || "None",
            category: course.category,
            creditHour: course.credit_hour,
            color: categoryColors[course.category] || "#ccc", // Default color if not specified
          }))
        );
      }
    };

    fetchCourses();
  }, []);

  // Sort courses by the category order defined in categoryColors
  const sortedSidebarCourses = sidebarCourses.sort((a, b) => {
    const orderA = Object.keys(categoryColors).indexOf(a.category);
    const orderB = Object.keys(categoryColors).indexOf(b.category);
    return orderA - orderB;
  });

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const sourceCourse = sidebarCourses.find((course) => course.id === active.id);
    const targetIndex = parseInt(over.id.split("-")[1], 10);

    // Handle dragging from the sidebar to the main UI
    if (sourceCourse && droppedCourses[targetIndex] === null) {
      setSidebarCourses(sidebarCourses.filter((course) => course.id !== active.id));
      const updatedDroppedCourses = [...droppedCourses];
      updatedDroppedCourses[targetIndex] = sourceCourse;
      setDroppedCourses(updatedDroppedCourses);
    }

    // Handle dragging back to the sidebar
    const sourceDroppedCourse = droppedCourses.find((course) => course?.id === active.id);
    if (sourceDroppedCourse) {
      setDroppedCourses(
        droppedCourses.map((course) => (course?.id === active.id ? null : course))
      );
      setSidebarCourses([...sidebarCourses, sourceDroppedCourse]);
    }
  };

  const fetchUserIds = async (staffId, studentId) => {
    try {
      // Fetch the advisor (staff_id) UUID
      const { data: advisorData, error: advisorError } = await supabase
        .from('users')
        .select('id')
        .eq('staff_id', staffId)
        .single();

      if (advisorError) throw advisorError;

      // Fetch the student UUID
      const { data: studentData, error: studentError } = await supabase
        .from('users')
        .select('id')
        .eq('student_id', studentId)
        .single();

      if (studentError) throw studentError;

      return {
        advisorId: advisorData.id,
        studentId: studentData.id,
      };
    } catch (error) {
      console.error("Error fetching user IDs:", error);
      return null;
    }
  };

  const savePlan = async () => {
    const staffId = "inputted-staff-id"; // Replace with actual input or dynamic value
    const studentId = "inputted-student-id"; // Replace with actual input or dynamic value

    const userIds = await fetchUserIds(staffId, studentId);

    if (!userIds) {
      console.error("Failed to fetch advisor or student IDs.");
      return;
    }

    const sanitizedDroppedCourses = droppedCourses.filter(course => course !== null);

    const { data, error } = await supabase
      .from('plans')
      .insert([
        {
          advisor_id: userIds.advisorId, // Use fetched UUID
          student_id: userIds.studentId, // Use fetched UUID
          courses: JSON.stringify(sanitizedDroppedCourses),
          semester: "1", // Replace with dynamic value if needed
        },
      ]);

    if (error) {
      console.error("Error saving plan:", error);
    } else {
      console.log("Plan saved successfully:", data);
    }
  };

  const fetchPlan = async () => {
    const { data, error } = await supabase
      .from('plans')
      .select('courses')
      .eq('advisor_id', advisor_id) // Update with the actual advisor ID
      .eq('student_id', student_id) // Update with the actual student ID
      .single();

    if (error) {
      console.error("Error fetching plan:", error);
    } else if (data) {
      setDroppedCourses(JSON.parse(data.courses) || []);
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <div className="planner-main-container">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Sidebar */}
          <div className="planner-sidebar">
            {sortedSidebarCourses.length > 0 ? (
              sortedSidebarCourses.map((course) => (
                <DraggableCourse key={course.id} {...course} />
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>

          {/* Main UI */}
          <div className="planner-main-ui">
            <div className="planner-controls">
              <button onClick={savePlan}>Save Plan</button>
              <button onClick={fetchPlan}>Load Plan</button>
            </div>
            <div className="planner-grid">
              {droppedCourses.map((course, index) => (
                <DroppableArea key={index} id={`drop-${index}`}>
                  {course && <DraggableCourse key={course.id} {...course} />}
                </DroppableArea>
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default AdvisorPlanner;
