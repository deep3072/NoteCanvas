import React, { useState } from "react";
import UserAvatar from "../components/UserAvatar";
import BottomRightChatButton from "../components/chat_component/BottomRightUsersButton";
import { Space } from "react-zoomable-ui";
import DropTarget from "../components/note_component/DropTarget";

const CanvasPageActiveTwo = () => {
    const [canvasPageList, setCanvasPageList] = useState([
        {
            id: 1,
            name: "Canvas Page 1",
        },
        {
            id: 2,
            name: "Canvas Page 1",
        },
        {
            id: 3,
            name: "Canvas Page 1",
        },
        {
            id: 4,
            name: "Canvas Page 1",
        },
        {
            id: 4,
            name: "Canvas Page 1",
        },
        {
            id: 4,
            name: "Canvas Page 1",
        },
        {
            id: 4,
            name: "Canvas Page 1",
        },
    ]);

    return (
        <>
            <UserAvatar />
            <BottomRightChatButton />
            <Space
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "lightgrey",
                }}
            >
                <DropTarget>space 1</DropTarget>
                <DropTarget>space 2</DropTarget>
            </Space>
        </>
    );
};

export default CanvasPageActiveTwo;
