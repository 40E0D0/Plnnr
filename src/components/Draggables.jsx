import React from "react";
import { useDraggable } from "@dnd-kit/core";

const Draggables = ({
  id,
  courseCode,
  courseName,
  lecturer,
  prerequisite,
  category,
  creditHour,
  color,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
    width: "270px",
    height: "170px",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "white",
    boxShadow: isDragging ? "0px 4px 20px rgba(0, 0, 0, 0.2)" : "5px 5px 6px rgba(0, 0, 0, 0.1)", // Enhanced shadow when dragging
    borderRadius: "2px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    fontSize: "14px",
    zIndex: isDragging ? 1000 : "auto", // Set a high z-index when dragging
    position: isDragging ? "absolute" : "relative", // Change position to absolute when dragging
    transition: "transform 0.1s ease", // Smooth transition for draggin
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{ fontWeight: "bold", backgroundColor: color, padding: "4px" }}>
        {courseCode} <span style={{ float: "right" }}>{creditHour} Cr. Hr</span>
      </div>
      <div>
        <div style={{ fontWeight: "bold", marginTop: "-10px" }}>{courseName}</div>
        <div style={{ fontSize: "12px", color: "black" }}>
          {lecturer || "(Lecturer Undecided)"}
        </div>
        <div style={{ fontSize: "12px", color: "#777" }}>
          <b className="text-black">Prerequisite:</b> {prerequisite || "None"}
        </div>
      </div>
      <div style={{ fontWeight: "bold", fontSize: "12px", color: "black" }}>{category}</div>
    </div>
  );
};

export default Draggables;