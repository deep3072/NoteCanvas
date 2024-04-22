import { TextField } from "@mui/material";
import React from "react";


const FilledTextField = ({ placeholder, label, type = "text", inputRef, helperText }) => {
    return (
        <TextField
            // ref={ref}
            helperText={helperText}
            inputRef={inputRef}
            variant="filled"
            type={type}
            placeholder={placeholder}
            label={label}
            InputProps={{
                disableUnderline: true,
                sx: { borderRadius: "10px" },
            }}
        />
    );
};

export default FilledTextField;
