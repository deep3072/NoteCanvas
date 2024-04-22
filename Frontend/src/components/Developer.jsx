import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const Developer = ({ name, bgcolor = "#00000080", description }) => {
    const getInitials = (name) => {
        const words = name.split(" ");
        const initials = words.map((word) => word.charAt(0));
        return initials.join("");
    };

    return (
        <Stack width={"calc(350px / 2.3)"} alignItems={"center"}>
            <Avatar
                sx={{
                    borderRadius: "20px",
                    height: "80px",
                    width: "80px",
                    bgcolor: bgcolor,
                    fontWeight: 600,
                }}
            >
                {getInitials(name)}
            </Avatar>
            <Typography fontWeight={500} lineHeight={2}>
                {name}
            </Typography>
            <Typography color={"grey"} lineHeight={1.3} fontSize={15}>
                {description}
            </Typography>
        </Stack>
    );
};

export default Developer;
