import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes"; // Define your item types

const DraggableComponent = ({ id, children }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.BOX, id }, // Specify the item type and ID
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} style={{ opacity }}>
            {children}
        </div>
    );
};

export default DraggableComponent;
