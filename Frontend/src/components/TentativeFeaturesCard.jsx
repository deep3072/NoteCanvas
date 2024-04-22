import React from "react";
import LoginPageCard from "./LoginPageCard";
import { Stack, Typography } from "@mui/material";
import Tag from "./Tag";

const TentativeFeaturesCard = () => {
    return (
        <LoginPageCard borderRadius={"50px 0px 50px 50px"} height={350}>
            <Typography
                variant="h6"
                fontWeight={600}
                borderLeft={"0px"}
                borderRight={"0px"}
            >
                Tentative features
            </Typography>

            <Stack
                borderLeft={"0px"}
                borderRight={"0px"}
                direction={"row"}
                gap={1}
                flexWrap={"wrap"}
            >
                <Tag text="Create notes" bgcolor={"#F5F5F5"} />
                <Tag text="Canvas layout" bgcolor={"#D9D9D9"} />
                <Tag
                    text="Organize notes into categories"
                    bgcolor={"#D9D9D9"}
                />
                <Tag text="Notes customization" bgcolor={"#F5F5F5"} />
                <Tag text="Attach files" bgcolor={"#F5F5F5"} />
                <Tag text="Command bar" bgcolor={"#FF8246"} />
                <Tag text="Note pinning" bgcolor={"#D9D9D9"} />
                <Tag text="Keyboard shortcuts" bgcolor={"#F5F5F5"} />
                <Tag text="Collab session" bgcolor={"#FF8246"} />
                <Tag text="Chat with collaborators" bgcolor={"#F5F5F5"} />
                <Tag text="Export notes" bgcolor={"#D9D9D9"} />
                <Tag text="Search notes" bgcolor={"#F5F5F5"} />
                <Tag text="Markdown" bgcolor={"#FF8246"} />
                <Tag text="...and we are thinking of more." color="grey" />
            </Stack>
        </LoginPageCard>
    );
};

export default TentativeFeaturesCard;
