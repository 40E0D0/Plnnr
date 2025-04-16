import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import DroppableArea from '../components/DroppableArea';
import DraggableCourse from '../components/Draggables';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../stylings/planner.css';
import { supabase } from '../auth/client'; // Import Supabase client

const CoursePlanner = ({ token }) => {
  let navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  const [sidebarCourses, setSidebarCourses] = useState([]);
  const [droppedCourses, setDroppedCourses] = useState({
    semester1: [null, null, null, null, null, null, null],
    semester2: [null, null, null, null, null, null, null],
    semester3: [null, null, null, null, null, null, null],
    semester4: [null, null, null, null, null, null, null],
    semester5: [null, null, null, null, null, null, null],
    semester6: [null, null, null, null, null, null, null],
  });
  

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
      const { data, error } = await supabase.from('courses').select('*');
      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        console.log('Courses fetched:', data); // Debugging output
        setSidebarCourses(
          data.map(course => ({
            id: `course-${course.id}`, // Add unique identifier
            courseCode: course.course_code,
            courseName: course.course_name,
            lecturer: course.lecturer_name || 'Not assigned',
            prerequisite: course.prerequisite || 'None',
            category: course.category,
            creditHour: course.credit_hour,
            color: categoryColors[course.category] || '#ccc', // Default color if not specified
          }))
        );
      }
    };
    
    fetchCourses();
  }, []);

  // Sort courses by the category order defined in categoryColors
  const sortedCourses = sidebarCourses.sort((a, b) => {
    const orderA = Object.keys(categoryColors).indexOf(a.category);
    const orderB = Object.keys(categoryColors).indexOf(b.category);
    return orderA - orderB;
  });

  /* const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const sourceCourse = sidebarCourses.find((course) => course.id === active.id);
    const targetIndex = parseInt(over.id.split('-')[1], 10);

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
  }; */

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
  
    const sourceCourse = sidebarCourses.find((course) => course.id === active.id);
    if (!sourceCourse) return;
  
    const [semesterKey, targetIndex] = over.id.split('-'); // Extract semester and index
    const index = parseInt(targetIndex, 10);
  
    // Update the specific semester's dropped courses
    setDroppedCourses((prev) => {
      const updatedSemester = [...prev[semesterKey]];
      if (updatedSemester[index] === null) {
        updatedSemester[index] = sourceCourse;
        return { ...prev, [semesterKey]: updatedSemester };
      }
      return prev;
    });
  
    // Remove course from sidebar
    setSidebarCourses(sidebarCourses.filter((course) => course.id !== active.id));
  };
  

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <div className="planner-main-container">
        
        <DndContext onDragEnd={handleDragEnd}>
          {/* Sidebar */}
          <div className="planner-sidebar">
            {sortedCourses.length > 0 ? (
              sortedCourses.map((course) => (
                <DraggableCourse key={course.id} {...course} />
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>

          {/* Main UI */}
          <div className="planner-main-ui">
            <h1 className="text-2xl font-bold mb-4 mt-6 px-1">Semester 1</h1>
            <div className="planner-grid">
              {droppedCourses.semester1.map((course, index) => (
                <DroppableArea key={index} id={`semester1-${index}`}>
                {droppedCourses.semester1[index] && <DraggableCourse key={droppedCourses.semester1[index].id} {...droppedCourses.semester1[index]} />}
              </DroppableArea>
              
              ))}
            </div>
            <h1 className="planner-header">Semester 2</h1>
            <div className="planner-grid">
              {droppedCourses.semester2.map((course, index) => (
                <DroppableArea key={index} id={`semester2-${index}`}>
                {droppedCourses.semester2[index] && <DraggableCourse key={droppedCourses.semester2[index].id} {...droppedCourses.semester2[index]} />}
              </DroppableArea>
              
              ))}
            </div>
            <h1 className="planner-header">Semester 3</h1>
            <div className="planner-grid">
              {droppedCourses.semester3.map((course, index) => (
                <DroppableArea key={index} id={`semester3-${index}`}>
                {droppedCourses.semester3[index] && <DraggableCourse key={droppedCourses.semester3[index].id} {...droppedCourses.semester3[index]} />}
              </DroppableArea>
              
              ))}
            </div>
            <h1 className="planner-header">Semester 4</h1>
            <div className="planner-grid">
              {droppedCourses.semester4.map((course, index) => (
                <DroppableArea key={index} id={`semester4-${index}`}>
                {droppedCourses.semester4[index] && <DraggableCourse key={droppedCourses.semester4[index].id} {...droppedCourses.semester4[index]} />}
              </DroppableArea>
              
              ))}
            </div>
            <h1 className="planner-header">Semester 5</h1>
            <div className="planner-grid">
              {droppedCourses.semester5.map((course, index) => (
                <DroppableArea key={index} id={`semester5-${index}`}>
                {droppedCourses.semester5[index] && <DraggableCourse key={droppedCourses.semester5[index].id} {...droppedCourses.semester5[index]} />}
              </DroppableArea>
              
              ))}
            </div>
            <h1 className="planner-header">Semester 6</h1>
            <div className="planner-grid">
              {droppedCourses.semester6.map((course, index) => (
                <DroppableArea key={index} id={`semester6-${index}`}>
                {droppedCourses.semester6[index] && <DraggableCourse key={droppedCourses.semester6[index].id} {...droppedCourses.semester6[index]} />}
              </DroppableArea>
              
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default CoursePlanner;
