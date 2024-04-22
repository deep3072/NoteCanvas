// Todo:

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LogoOrange from "../assets/logo_orange.svg";
import { motion } from "framer-motion";

const LoginPageCard = ({
    bgcolor = "#ffffff50",
    borderRadius,
    border = 1,
    padding = 3.5,
    minWidth,
    height = 350,
    flex = 1,
    bgImage,
    children,
}) => {
    return (
        <motion.div
            style={{
                flex: flex,
            }}
            initial={{
                opacity: 0,
                scale: 0.9,
                y: 100,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
            }}
        >
            <Stack
                overflow={"hidden"}
                justifyContent={"left"}
                sx={{
                    backdropFilter: "blur(10px)",
                    backgroundImage: `url(${bgImage})`,
                    // backgroundSize: "20px",
                    backgroundPosition: "center",
                    backgroundSize: "120%",
                    backgroundPositionX: "200px",
                }}
                bgcolor={bgcolor}
                border={border}
                direction={"column"}
                padding={padding}
                borderRadius={borderRadius}
                gap={3}
                minWidth={minWidth}
                height={height}
            >
                {children}
            </Stack>
        </motion.div>
    );
};

export default LoginPageCard;
