import { Box } from "@mui/material";
import React from "react";

const Tag = ({ bgcolor, color = "#000", text = "Default" }) => {
    return (
        <Box
            bgcolor={bgcolor}
            padding={"7px 15px"}
            borderRadius={20}
            fontWeight={500}
            fontSize={15}
            color={color}
        >
            {text}
        </Box>
    );
};

export default Tag;
