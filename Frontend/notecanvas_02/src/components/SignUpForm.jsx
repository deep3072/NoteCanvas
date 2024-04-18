import {
    Avatar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { React, useState } from "react";
import FilledTextField from "./FilledTextField";
import RoundedButton from "./RoundedButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        signUpFullName: "",
        signUpEmail: "",
        signUpUsername: "",
        signUpPassword: "",
    });

    const clearForm = () => {
        setFormData({
            signUpFullName: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: "",
        });
        setFormErrors({
            signUpFullName: "",
            signUpEmail: "",
            signUpUsername: "",
            signUpPassword: "",
        });
    };

    // const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

    const [formErrors, setFormErrors] = useState({});

    // todo 1: form validation: WORKING
    // todo 2: form submit to backend
    const validateSignUp = () => {
        let newErrors = {};

        // Basic form validation
        for (const key in formData) {
            if (!formData[key].trim()) {
                newErrors[key] = `${
                    key.charAt(0).toUpperCase() + key.slice(1)
                } can't be blank`;
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.signUpEmail && !emailRegex.test(formData.signUpEmail)) {
            newErrors.signUpEmail = "Invalid email format";
        }

        if (formData.signUpPassword.length < 8) {
            newErrors.signUpPassword =
                "Password should be at least 8 characters";
        }
        if (formData.signUpUsername.includes(" ")) {
            newErrors.signUpUsername = "Username should not contain spaces";
        }

        // displaying errors
        setFormErrors(newErrors);

        // if no errors, submit form
        if (Object.keys(newErrors).length === 0) {
            // todo 2: Sending form to backend
            // setSignUpButtonDisabled(true);
            console.log(
                "Form submitted successfully:",
                JSON.stringify(formData)
            );
        } else {
            console.log(formErrors);
        }
    };

    // handle value change individually
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // todo: change view to sign up form
    const switchToLogIn = () => {
        console.log("Switch to log in");
    };

    const [showPassword, setShowPassword] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);
    const handleAvatarUpload = () => {
        console.log("Avatar upload");

        // todo: profile photo upload logic goes here
        // get the image file
        // upload to the server
        // get the url
        // set the url to the user profile

        // for now, just log the file
        console.log(document.getElementById("fileInput").files[0].name);
        setAvatarFile(document.getElementById("fileInput").files[0].name);
    };

    return (
        <Stack width={"100%"} alignContent={"start"} justifyContent={"start"}>
            <Typography color={"#ffffff"} fontSize={24} fontFamily={"poppins"}>
                Create a new account
            </Typography>
            <Box height={15}>
                <Typography
                    variant="body2"
                    fontStyle={"italic"}
                    color={"#BE0B00"}
                    fontFamily={"poppins"}
                >
                    {/* if there are errors, show a message  */}
                    {formErrors.signUpFullName ||
                    formErrors.signUpEmail ||
                    formErrors.signUpUsername ||
                    formErrors.signUpPassword
                        ? "Please fix the errors below"
                        : ""}
                </Typography>
            </Box>
            <FormControl fullWidth>
                <Stack mt={3} direction={"row"}>
                    <Avatar
                        // onChange={handleAvatarUpload}
                        src={avatarFile}
                        sx={{
                            height: 100,
                            width: 100,
                            borderRadius: "25px",
                            color: "#ffffff50",
                            backgroundColor: "#2C2C2C",
                        }}
                    />
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleAvatarUpload}
                    />

                    <RoundedButton
                        onClick={() =>
                            document.getElementById("fileInput").click()
                        }
                        variant="text"
                        bgcolor="transparent"
                        fontWeight={400}
                        mt="0"
                        fontSize="15px"
                    >
                        {/* todo: user photo upload */}
                        Upload photo
                        <FileUploadOutlinedIcon sx={{ paddingLeft: 1 }} />
                    </RoundedButton>
                </Stack>

                <FilledTextField
                    label={"Full name"}
                    error={formErrors.signUpFullName ? true : false}
                    helperText={formErrors.signUpFullName}
                    onChange={handleChange}
                    value={formData.signUpFullName}
                    name="signUpFullName"
                    placeholder={"Awesome Name"}
                />
                <FilledTextField
                    label={"Email"}
                    error={formErrors.signUpEmail ? true : false}
                    helperText={formErrors.signUpEmail}
                    onChange={handleChange}
                    value={formData.signUpEmail}
                    name="signUpEmail"
                    placeholder={"someone@somewhere.com"}
                />
                <FilledTextField
                    label={"Create a username"}
                    error={formErrors.signUpUsername ? true : false}
                    helperText={formErrors.signUpUsername}
                    onChange={handleChange}
                    value={formData.signUpUsername}
                    name="signUpUsername"
                    placeholder={"fooUser"}
                />
                <TextField
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    sx={{
                        mt: 2,
                        bgcolor: "#2C2C2C",
                        borderRadius: "11px",
                        label: { color: "#ffffff50" },
                        input: {
                            color: "white",
                            borderRadius: "11px",
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <VisibilityOutlinedIcon
                                            sx={{ color: "#ffffff70" }}
                                        />
                                    ) : (
                                        <VisibilityOffOutlinedIcon
                                            sx={{ color: "#ffffff70" }}
                                        />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    label={"Set password"}
                    error={formErrors.signUpPassword ? true : false}
                    helperText={formErrors.signUpPassword}
                    onChange={handleChange}
                    value={formData.signUpPassword}
                    name="signUpPassword"
                    placeholder={"Numbers, alphabets, special chars, bla bla"}
                />
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <RoundedButton
                        onClick={validateSignUp}
                        // disabled={signUpButtonDisabled}
                    >
                        Get started
                        <ArrowForwardIcon sx={{ paddingLeft: "10px" }} />
                    </RoundedButton>
                    <RoundedButton
                        variant="text"
                        bgcolor="transparent"
                        fontSize="12px"
                        onClick={clearForm}
                    >
                        Clear
                        <CloseOutlinedIcon
                            sx={{ paddingLeft: "5px", fontSize: "20px" }}
                        />
                    </RoundedButton>
                </Stack>
            </FormControl>
        </Stack>
    );
};

export default SignUpForm;
