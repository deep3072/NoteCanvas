import { Button, IconButton } from "@mui/material";
import React from "react";

const NoteColorButton = ({ color, onclick }) => {
    return (
        <IconButton
            disableRipple
            onClick={onclick}
            sx={{
                border: "1px solid #00000050",
                bgcolor: color,
                height: "25px",
                width: "25px",
                borderRadius: "50%",
                padding: "0",
                margin: "0",
                opacity: 0.4,
                transition: "opacity 0.2s",
                "&:hover": {
                    opacity: 1,
                },
            }}
        ></IconButton>
    );
};

export default NoteColorButton;
