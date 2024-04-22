import React from "react";
import DropTarget from "./note_component/DropTarget";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const CanvasSpace = ({
    addNewSpaceButton,
    disabledAddButton = false,
    spaceNumber,
}) => {
    return (
        <Box
            // sx={{
            //     aspectRatio: "16/9",
            // }}
            height={"100%"}
            width={"100%"}
            border="1px red dashed"
            display={"flex"}
            // justifyContent={"center"}
            alignItems={"center"}
        >
            <DropTarget>
                <Typography
                    fontFamily={"monospace"}
                    sx={{
                        padding: "10px",
                        left: "30px",
                        bottom: "30px",
                        color: "#00000050",
                    }}
                >
                    Space {spaceNumber}
                </Typography>
            </DropTarget>
            <Button
                onClick={addNewSpaceButton}
                disabled={disabledAddButton}
                // variant={showAddButton ? "disabled" : ""}
                sx={{
                    borderRadius: "10px",
                    height: "95vh",
                    width: disabledAddButton ? 0 : "150px",
                    textTransform: "capitalize",
                    ml: "10px",
                    color: "#ffffff40",
                    ":hover": {
                        backgroundColor: "#FF530040",
                        color: "#ffffff",
                    },
                }}
            >
                <AddOutlinedIcon />
            </Button>
        </Box>
    );
};

export default CanvasSpace;
