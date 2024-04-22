import React from "react";
import { ResizableBox } from "react-resizable";

const ResizableNote = () => {
    const [dimensions, setDimensions] = React.useState({
        height: 300,
        width: 300,
    });

    return (
        <ResizableBox
            style={{
                border: "1px solid #000000",
                backgroundColor: "#ffffff", // Add a background color
                padding: "5px", // Add padding to make handles more visible
            }}
            resizeHandles={["se", "sw", "ne", "nw", "n", "s", "e", "w"]}
            onResize={(event, { size }) => {
                setDimensions(size);
            }}
            width={200}
            height={200}
            minConstraints={[100, 100]}
            maxConstraints={[400, 400]}
        >
            <h1>resizeable note testing</h1>
        </ResizableBox>
    );
};

export default ResizableNote;
