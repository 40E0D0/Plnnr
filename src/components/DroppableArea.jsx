import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableArea = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    width: "270px",
    height: "175px",
    border: isOver ? "2px dashed #4CAF50" : "2px dashed black",
    borderRadius: "2px",
    backgroundColor: isOver ? "#E8F5E9" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default DroppableArea;
