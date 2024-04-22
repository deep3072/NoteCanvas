import React from "react";
import { IconButton } from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";

const BottomRightUsersButton = () => {
    const handleClick = () => {
        // todo: chat button logic goes here
        console.log("Chat Button Clicked");
    };

    return (
        <IconButton
            onClick={handleClick}
            style={{
                zIndex: 100000,
                position: "fixed",
                bottom: "50px",
                right: "50px",
                backgroundColor: "#2C2C2C",
                color: "#ffffff50",
                border: "1px #3F3F3F solid",
                height: "50px",
                width: "50px",
                borderRadius: "20px",
            }}
        >
            <GroupIcon />
        </IconButton>
    );
};

export default BottomRightUsersButton;