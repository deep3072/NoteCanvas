import React from "react";
import {
    Box,
    Stack,
    IconButton,
    TextField,
    OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import NoteColorButton from "../note_component/NoteColorButton";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const NoteOne = () => {
    const [noteBGColor, setNoteBGColor] = React.useState("#ffffff50");
    const [border, setBorder] = React.useState("1px solid #00000050");

    const [noteContent, setNoteContent] = React.useState("");

    // noteEditMode is used to toggle between note content view and note content edit mode
    const [noteEditMode, setNoteEditMode] = React.useState(false);

    const handleNoteContentChange = (event) => {
        setNoteEditMode(!noteEditMode);
        if (document.activeElement.id === "noteContentTextField") {
            console.log("Note content text field has focus");
            setBorder("2px dashed red");
            return;
        } else {
            console.log("Note content text field does not have focus");
            setBorder("1px solid #00000050");
        }
    };

    return (
        <Box
            border={border}
            bgcolor={noteBGColor}
            sx={{
                backdropFilter: "blur(10px)",
                display: "flex",
            }}
            height={"100%"}
            width={"100%"}
            borderRadius={4}
            // padding={1}
            boxShadow={"2px 2px 5px #00000030"}
        >
            <Stack flexGrow={1} width={"100%"}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        spacing={0.5}
                    >
                        <NoteColorButton
                            color={"#ffffff"}
                            onclick={() => setNoteBGColor("#ffffff50")}
                        />
                        <NoteColorButton
                            color={"#A8CC8C"}
                            onclick={() => setNoteBGColor("#A8CC8C50")}
                        />
                        <NoteColorButton
                            color={"#DEC63D"}
                            onclick={() => setNoteBGColor("#DEC63D50")}
                        />
                        <NoteColorButton
                            color={"#C5B8A4"}
                            onclick={() => setNoteBGColor("#C5B8A450")}
                        />
                        <NoteColorButton
                            color={"#658080"}
                            onclick={() => setNoteBGColor("#65808050")}
                        />
                        <NoteColorButton
                            color={"#6FC5CB"}
                            onclick={() => setNoteBGColor("#6FC5CB50")}
                        />
                    </Stack>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </Stack>
                <Stack
                    onClick={() => handleNoteContentChange()}
                    onDoubleClick={() => console.log("Note double clicked")}
                    flexGrow={1}
                    paddingTop={3}
                    px={2}
                    pb={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                    overflow={"auto"}
                    sx={{
                        scrollbarColor: "#00000050 #ffffff00",
                        scrollbarWidth: "thin",
                        scrollbarGutter: "0",
                        scrollMargin: "0",
                        scrollBehavior: "smooth",
                    }}
                >
                    <TextField
                        variant="standard"
                        minRows={9}
                        InputProps={{
                            // textAlign: "center",
                            sx: {
                                textAlign: "center",
                                border: "none",
                                outline: "none",
                                padding: 0,
                                backgroundColor: "transparent",
                                fontFamily: "Poppins",
                            },
                            disableUnderline: true,
                        }}
                        id="noteContentTextField"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        // when losing focus, toggle noteEditMode
                        onBlur={() => handleNoteContentChange()}
                        multiline
                        autoFocus
                        fullWidth
                        placeholder={"ಠ_ಠ Write something..."}
                        // sx={{
                        //     textAlign: "center",
                        //     border: "none",
                        //     outline: "none",
                        //     padding: 0,
                        //     backgroundColor: "transparent",
                        // }}
                    />

                    {/* The mirror showed my reflection, but its eyes were */}
                </Stack>
            </Stack>
        </Box>
    );
};

export default NoteOne;
