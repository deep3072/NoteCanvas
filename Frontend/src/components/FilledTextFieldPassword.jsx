import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FilledTextFieldPassword = ({
    placeholder,
    label,
    type = "text",
    inputRef,
    helperText = null,
    // error = false,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    // const [helperText, setHelperText] = useState('');

    // handleTogglePasswordVisibility function toggles the 
    //visibility of the password by updating the showPassword state.

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    
    // handleChange function updates the password state whenever the input value changes
    // handleChange function, which updates the password state with the new value. This ensures that the input field always displays the 
    // correct value based on the component's state.

    const handleChange = (event) => {
        setPassword(event.target.value);
    };

    // validation logic below :

    const handleValidation = () => {
        // Add your validation logic here
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecial = /[^A-Za-z0-9]/;
    
        if (password.length < 8) {
            setError(true);
            setHelperText('Password must be at least 8 characters long');
        } else if (!regexUpperCase.test(password)) {
            setError(true);
            setHelperText('Password must contain at least one uppercase letter');
        } else if (!regexLowerCase.test(password)) {
            setError(true);
            setHelperText('Password must contain at least one lowercase letter');
        } else if (!regexNumber.test(password)) {
            setError(true);
            setHelperText('Password must contain at least one number');
        } else if (!regexSpecial.test(password)) {
            setError(true);
            setHelperText('Password must contain at least one special character');
        } else {
            setError(false);
            setHelperText('');
        }
    };
    

    return (
        <TextField
        // error = {false}
            inputRef={inputRef}
            variant="filled"
            helperText={helperText}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            label={label}
            InputProps={{
                disableUnderline: true,
                sx: { borderRadius: "10px" },

                endAdornment:
                    type === "password" ? (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ) : null,
            }}
        />
    );
};

export default FilledTextFieldPassword;
