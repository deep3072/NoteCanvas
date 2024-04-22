import { Stack, Typography } from "@mui/material";
import React from "react";

const LoginCardUpperThings = () => {
    return (
        <Stack>
            {/* TOP */}
            <Typography
                fontFamily={"poppins"}
                fontWeight={500}
                fontSize={24}
                color={"#ffffff40"}
            >
                Feeling overwhelmed by traditional note-taking?
            </Typography>
            <Typography
                mt={1}
                fontFamily={"poppins"}
                fontWeight={500}
                fontSize={24}
                color={"#ffffff70"}
            >
                Try NoteCanvas.
            </Typography>
            <Stack mt={4} gap={8} direction={"row"}>
                <Typography
                    color={"#ffffff90"}
                    fontFamily={"poppins"}
                    width={150}
                >
                    Escape the limitations of linear notes.
                </Typography>
                <Typography
                    color={"#ffffff90"}
                    fontFamily={"poppins"}
                    width={150}
                >
                    Organize your thoughts visually with digital sticky notes.
                </Typography>
            </Stack>
            <Typography
                mt={4}
                color={"#ffffff90"}
                fontFamily={"poppins"}
                width={150}
            >
                A perfect layout for any project or brainstorm.
            </Typography>
        </Stack>
    );
};

export default LoginCardUpperThings;
