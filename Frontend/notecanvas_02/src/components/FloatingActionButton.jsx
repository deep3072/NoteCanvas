import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const FloatingActionButton = () => {
    return (
        <Button
            sx={{
                zIndex: 1,
                position: "fixed",
                bottom: "50px",
                right: "50px",
                height: 80,
                width: 80,
                borderRadius: 50,
                bgcolor: "#00000050",
                border: "1px solid #0a0a0a",
            }}
        >
            <AddIcon sx={{ color: "#000000" }} />
        </Button>
    );
};

export default FloatingActionButton;
