import { Stack } from "@mui/material";
import React from "react";
import LogoOrange from "../assets/logo.svg";

const LandingPageCard = ({
    bgcolor = "#00000025",
    borderRadius = "40px",
    padding = "40px",
    flex = 1,
    children,
    border = "1px #000 solid",
    boxShadow = "0 0 0 1px 2px #000",
    alignItems = "start",
    justifyContent,
    minWidth = "400px",
    minHeight = "300px",
    color,
}) => {
    return (
        <Stack
            sx={{ backdropFilter: "blur(50px)" }}
            bgcolor={bgcolor}
            color={color}
            padding={padding}
            borderRadius={borderRadius}
            flex={flex}
            border={border}
            alignItems={alignItems}
            minHeight={minHeight}
            minWidth={minWidth}
            boxShadow={boxShadow}
            justifyContent={justifyContent}
        >
            {children}
        </Stack>
    );
};

export default LandingPageCard;
