import React, { useEffect, useRef, useState } from "react";
import { Pressable, Space } from "react-zoomable-ui";
import UserAvatar from "../components/UserAvatar";
import GridDots from "../assets/grid_dots_portion.png";
import FloatingActionButton from "../components/FloatingActionButton";

const CanvasPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef(null);
    const handleDoubleClick = (event) => {
        // Get the cursor position
        const xPos = event.clientX;
        const yPos = event.clientY;

        // Log the position to the console
        console.log(`Double-clicked at position: (${xPos}, ${yPos})`);

        const newInput = document.createElement("textarea");
        // newInput.type = "text";
        newInput.style.position = "absolute";
        newInput.style.left = `${xPos}px`;
        newInput.style.top = `${yPos}px`;

        // Append the input element to the body
        // document.body.appendChild(newInput);
        // Appending to canvas space
        const canvasSpaceElement = document.getElementById("canvas-space");
        canvasSpaceElement.appendChild(newInput);

        // Focus on the new input
        newInput.focus();
    };

    return (
        <>
            <UserAvatar />
            <FloatingActionButton />
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    position: "relative",
                }}
                onDoubleClick={handleDoubleClick}
            >
                <Space
                    onCreate={(vp) =>
                        vp.setBounds({
                            x: [0, 5000],
                            y: [0, 5000],
                        })
                    }
                    style={{ border: "1px solid #00000050" }}
                >
                    <div
                        id="canvas-space"
                        style={{
                            border: "1px solid #00000050",
                            height: "5000px",
                            width: "5000px",
                            backgroundImage: `url(${GridDots})`,
                            // backgroundColor: "#acacac",
                        }}
                    >
                        <h1>hello</h1>
                        <Pressable
                            onTap={() => {
                                console.log("tapped");
                            }}
                        >
                            Hello
                        </Pressable>
                    </div>
                </Space>
            </div>
        </>
    );
};

export default CanvasPage;
