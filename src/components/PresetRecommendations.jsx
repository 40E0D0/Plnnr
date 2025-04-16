import React from "react";
import Draggables from "./Draggables";

const PresetRecommendations = ({ courses }) => {

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

  return (
    <div className="preset-recommendations" style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold" style={{ marginBottom: "20px" }}>
        Preset Course Plan
      </h1>
      <div
        className="planner-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <Draggables
            key={course.id}
            id={course.id}
            courseCode={course.course_code}
            courseName={course.course_name}
            lecturer={course.lecturer_name}
            prerequisite={course.prerequisite}
            category={course.category}
            creditHour={course.credit_hour}
            color= {categoryColors[course.category] || '#ccc'} // Default color if not specified
            isDraggable={false} // This ensures the tiles are static
          />
        ))}
      </div>
    </div>
  );
};

export default PresetRecommendations;
