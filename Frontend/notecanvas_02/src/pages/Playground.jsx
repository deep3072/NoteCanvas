import { Box, Container, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandedDistoredLinesBG from "../assets/expanded_distorted_lines_bg.jpg";
import DraggableBox from "../components/note_component/DraggableBox";
import DropTarget from "../components/note_component/DropTarget";
import AddIcon from "@mui/icons-material/Add";

const Playground = () => {
    // list to store note cards
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
    const addNoteCard = () => {
        console.log("Adding new note card");
        const newId = noteCards.length + 1;
        const left = Math.floor(Math.random() * (window.innerWidth - 300));
        const top = Math.floor(Math.random() * (window.innerHeight - 300));
        setNoteCards((prevNoteCards) => [
            ...prevNoteCards,
            { id: newId, left, top },
        ]);
    };

    // function to delete note card
    const deleteNoteCard = (id) => {
        console.log("Deleting note card with id: ", id);
        setNoteCards((prevNoteCards) =>
            prevNoteCards.filter((card) => card.id !== id)
        );
    };

    // function to set focus on note card
    const [focusedNoteId, setFocusedNoteId] = useState(null);
    const handleFocus = (id) => {
        console.log("Setting focus on note with id: ", id);
        setFocusedNoteId(id);
    };

    return (
        <Box
            sx={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${ExpandedDistoredLinesBG})`,
            }}
        >
            <Container
                onDoubleClick={addNoteCard}
                maxWidth="xl"
                sx={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box width={700}>
                    <Typography fontFamily={"Poppins"} variant="h2">
                        Double tap anywhere to add a note.
                    </Typography>
                </Box>

                <DropTarget>
                    {noteCards.map((noteCard) => (
                        <DraggableBox
                            key={noteCard.id}
                            id={noteCard.id}
                            left={noteCard.left}
                            top={noteCard.top}
                            moveBox={moveBox}
                            zIndex={focusedNoteId === noteCard.id ? 1000 : 1}
                            onClick={() => handleFocus(noteCard.id)}
                            handleNoteDelete={() => deleteNoteCard(noteCard.id)}
                            handleAddNewNote={addNoteCard}
                        />
                    ))}
                </DropTarget>
            </Container>
        </Box>
    );
};

export default Playground;
