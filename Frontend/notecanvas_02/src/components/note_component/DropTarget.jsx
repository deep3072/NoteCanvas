import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox";
import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const DropTarget = ({ children, id, spaceNumber, canvasName }) => {
  id = useParams();
  console.log("LOL", id);

  const [{ isOver }, drop] = useDrop({
    accept: "box",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const left = offset ? offset.x : 20;
      const top = offset ? offset.y : 20;
      console.log("left: ", left);
      console.log("top: ", top);
      return { left, top };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Notes list
  const [noteCards, setNoteCards] = React.useState([]);

  // function to move note card
  const moveBox = (id, left, top) => {
    console.log("Moving box");
    setNoteCards((prevNoteCards) =>
      prevNoteCards.map((card) =>
        card.id === id ? { ...card, left, top } : card
      )
    );
  };

  // function to add new note card
  const addNoteCard = async (e) => {
    e.preventDefault(); // Prevent default behavior
    console.log("Adding new note card");
    //const newId = noteCards.length + 1;
    const newId = uuidv4();

    const left = e.clientX;
    const top = e.clientY;

    console.log("left:", left);
    console.log("top:", top);
    // const noteContent = "";
    const noteData = {
      // notesBody: "New Note",
      id: newId,
      body: "",
      posX: e.clientX, // Adjust according to your coordinate system
      posY: e.clientY,
      height: 100, // Default height
      width: 200, // Default width
      pinned: false, // Default pinned status
      color: "#FFD700", // Default color
    };
    console.log("noteData:", noteData.id);
    console.log("Space Number", spaceNumber);
    console.log("ID", id);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notes/create/${id.id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
          credentials: "include", // Necessary if you're managing sessions
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Note created:", data);
      } else {
        console.error("Failed to create note:", response.status);
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }

    setNoteCards((prevNoteCards) => [
      ...prevNoteCards,
      { id: noteData.id, body: noteData.body,left, top },
    ]);

    // set focus on new note card
    setFocusedNoteId(newId);
  };

  // function to delete note card
  const deleteNoteCard = async (id) => {
    console.log("Deleting note card with id: ", id);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/notes/delete/${id}/`, 
        {
          method: "DELETE",
          // No need for Content-Type header for DELETE requests
          // No need for body for DELETE requests
          credentials: "include", // Necessary if you're managing sessions
        }
      );
      if (response.ok) {
        setNoteCards((prevNoteCards) =>
          prevNoteCards.filter((card) => card.id !== id)
        );
        console.log("Note deleted successfully");
      } else {
        console.error("Failed to delete note:", response.status);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
};

  
  // function to set focus on note card
  const [focusedNoteId, setFocusedNoteId] = useState(null);
  const handleFocus = (e, id) => {
    e.preventDefault(); // Prevent default behavior
    console.log("Setting focus on note with id: ", id);
    setFocusedNoteId(id);
  };

  // fun useeffect: for retrieving the notes list
  // {
  //     data
  // after retrieve, map to draggable boxnpm
  // }

  return (
    <Stack
      // padding={"20px"}
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <div
        onDoubleClick={(e) => addNoteCard(e)}
        ref={drop}
        style={{
          // borderRadius: "10px",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#D9D9D9",
        }}
      >
        {noteCards.map((noteCard) => (
          <DraggableBox
            key={noteCard.id}
            body ={noteCard.body}
            id={noteCard.id}
            left={noteCard.left}
            top={noteCard.top}
            moveBox={moveBox}
            zIndex={focusedNoteId === noteCard.id ? 1000 : 1}
            onClick={(e) => handleFocus(e, noteCard.id)}
            handleNoteDelete={() => deleteNoteCard(noteCard.id)}
            handleAddNewNote={addNoteCard}
            // noteContent={noteCard.body}
          />
        ))}
        {children}
      </div>
      <Typography
        variant="caption"
        fontFamily={"poppins"}
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "0",
          padding: "20px",
          opacity: 0.5,
        }}
      >
        {canvasName}
      </Typography>
    </Stack>
  );
};

export default DropTarget;
