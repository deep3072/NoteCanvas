import React from "react";
import { ResizableBox } from "react-resizable";

import ReactStickyNotes from "@react-latest-ui/react-sticky-notes";

class Example extends React.Component {
    render() {
        return (
            <ResizableBox
                style={{
                    border: "1px solid #000000",
                    backgroundColor: "#ffffff", // Add a background color
                    padding: "5px", // Add padding to make handles more visible
                }}
                width={200}
                height={200}
                draggableOpts={{ grid: [25, 25] }}
                minConstraints={[100, 100]}
                maxConstraints={[300, 300]}
            >
                <span>Contents</span>
            </ResizableBox>
        );
    }
}

const ResizableNote2 = () => {
    return <ReactStickyNotes />;
};

export default ResizableNote2;
