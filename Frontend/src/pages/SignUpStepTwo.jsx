import {
    Avatar,
    Box,
    Container,
    FormControl,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import React, { useState, useRef } from "react";
import LogoOrange from "../assets/logo_orange.svg";
import ProfileImageUpload from "../assets/profile-image-upload.png";
import FilledTextField from "../components/FilledTextField";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import RoundedButton from "../components/RoundedButton";

const SignUpStepTwo = () => {
    const [signUpUserName, setSignUpUserName] = useState("");
    const [signUpPhone, setSignUpPhone] = useState("");

    function handleSignUpStepTwo() {
        console.log(signUpUserName);
        console.log(signUpPhone);
    }

    function checkUniqueUsername() {
        // todo: function to check if the username is unique
    }

    // backspace after number formatting
    function handleBackspace(event) {
        if (event.key === "Backspace") {
            console.log("Backspace pressed!");
            if (signUpPhone.length > 10) {
                setSignUpPhone(
                    `${signUpPhone.slice(1, 4)}${signUpPhone.slice(
                        6,
                        9
                    )}${signUpPhone.slice(10, 14)}`
                );
            }
        }
    }

    function handlePhoneInput(event) {
        const value = event.target.value;
        const isNumber = /^[0-9]*$/.test(value);

        // Formatting
        if (isNumber && value.length <= 10) {
            if (value.length == 10) {
                const areaCode = value.slice(0, 3);
                const midleThreeDigits = value.slice(3, 6);
                const lastFourDigits = value.slice(6);
                const formattedPhoneNumber = `(${areaCode}) ${midleThreeDigits}-${lastFourDigits}`;
                console.log(formattedPhoneNumber);
                setSignUpPhone(formattedPhoneNumber);
            } else {
                setSignUpPhone(value);
            }
        }
    }

    function handleUserNameInput(event) {
        const value = event.target.value;
        setSignUpUserName(value);
    }

    return (
        <Container component={"main"} maxWidth="sm">
            <Stack margin={10} gap={10}>
                <Stack alignItems={"center"}>
                    <img
                        src={LogoOrange}
                        alt="NoteCanvasLogoOrange"
                        height={60}
                    />
                    <Typography fontSize={20} fontWeight={600}>
                        NoteCanvas
                    </Typography>
                </Stack>
                <Stack alignItems={"center"} gap={2}>
                    <Typography
                        fontSize={30}
                        fontWeight={600}
                        textAlign={"center"}
                    >
                        Welcome MethiLal!
                    </Typography>
                    <Typography
                        // fontSize={30}
                        // fontWeight={600}
                        textAlign={"center"}
                    >
                        Just need a few things before we get started
                    </Typography>
                </Stack>

                <FormControl fullWidth>
                    <Stack alignItems={"center"} gap={2}>
                        <Stack gap={1} paddingBottom={2}>
                            <Avatar
                                sx={{
                                    height: "150px",
                                    width: "150px",
                                    borderRadius: "40px",
                                    border: "none",
                                }}
                                component={"button"}
                                // onClick={}
                            >
                                <img
                                    src={ProfileImageUpload}
                                    alt="ProfileImageUpload"
                                    height={"120%"}
                                />
                            </Avatar>
                            <Typography
                                fontStyle={"italic"}
                                textAlign={"center"}
                                color={"grey"}
                            >
                                Upload profile picture
                            </Typography>
                        </Stack>
                        <TextField
                            variant="filled"
                            value={signUpUserName}
                            onChange={handleUserNameInput}
                            fullWidth
                            type="text"
                            placeholder={"Create a usename"}
                            label={"Username"}
                            InputProps={{
                                disableUnderline: true,
                                sx: { borderRadius: "10px" },
                            }}
                        />
                        <TextField
                            variant="filled"
                            value={signUpPhone}
                            onChange={handlePhoneInput}
                            onKeyDown={handleBackspace}
                            fullWidth
                            type="text"
                            placeholder={"(000) 000 0000"}
                            label={"Phone"}
                            InputProps={{
                                disableUnderline: true,
                                sx: { borderRadius: "10px" },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box paddingRight={2}>+1</Box>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* <Select
                            variant="filled"
                            fullWidth
                            sx={{ border: "none", borderRadius: "10px" }}
                            label="Profession"
                            placeholder="Profession"
                            disableUnderline
                            onChange={handleProfessionSelect}
                        >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="None">None</MenuItem>
                            <MenuItem value="None">Engi</MenuItem>
                        </Select> */}

                        <RoundedButton onClick={handleSignUpStepTwo}>
                            Sign Up
                        </RoundedButton>
                    </Stack>
                </FormControl>
            </Stack>
        </Container>
    );
};

export default SignUpStepTwo;
