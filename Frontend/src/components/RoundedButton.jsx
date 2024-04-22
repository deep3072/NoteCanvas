import { Button } from "@mui/material";
import React from "react";

const RoundedButton = ({
    bgcolor = "#000",
    color = "#fff",
    onClick,
    children,
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                bgcolor: bgcolor,
                color: color,
                textTransform: "capitalize",
                borderRadius: "100px",
                padding: "10px 25px",
                fontSize: "medium",
            }}
        >
            {children}
        </Button>
    );
};

export default RoundedButton;
