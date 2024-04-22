import { Stack, Typography } from "@mui/material";
import React, { useRef , useState} from "react";
import FilledTextField from "./FilledTextField";
import FilledTextFieldPassword from "./FilledTextFieldPassword";
import RoundedButton from "./RoundedButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


import { AnimatePresence, motion } from "framer-motion";

const SignUpForm = () => {

    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const signUpPassword = useRef(null);
    const signUpUsername = useRef(null);
    const signUpEmail = useRef(null);

    const handleChange = (event) => {
        setPassword(event.target.value);
    

    // validation logic below :

        const handleValidation = () => {
            console.log(signUpPassword.current.value);



            const regexUpperCase = /[A-Z]/;
            const regexLowerCase = /[a-z]/;
            const regexNumber = /[0-9]/;
            const regexSpecial = /[^A-Za-z0-9]/;

            if (signUpPassword.length < 8) {
                setError(true);
                setHelperText('signUpPassword must be at least 8 characters long');
            } else if (!regexUpperCase.test(signUpPassword)) {
                setError(true);
                setHelperText('signUpPassword must contain at least one uppercase letter');
            } else if (!regexLowerCase.test(signUpPassword)) {
                setError(true);
                setHelperText('signUpPassword must contain at least one lowercase letter');
            } else if (!regexNumber.test(signUpPassword)) {
                setError(true);
                setHelperText('signUpPassword must contain at least one number');
            } else if (!regexSpecial.test(signUpPassword)) {
                setError(true);
                setHelperText('signUpPassword must contain at least one special character');
            } else {
                setError(false);
                setHelperText('');
            }  

    };
    const checkBoth = () => {
        if (signUpUsername && signUpEmail && signUpPassword) {
          
            console.log("All fields are entered");
         } 
         else {
          // At least one field is null
             console.log("All fields should be entered");
         }
       }




};

    return (
        <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            exit={{
                x: 200,
                opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
            }}
        >
            {/* SIGN UP FORM */}
            <Typography
                variant="h6"
                fontWeight={600}
                borderLeft={"0px"}
                borderRight={"0px"}
            >
                Sign up for a new account
            </Typography>
            <form id="signUpForm" height={"100%"} style={{ flex: 1 }}>
                <Stack
                    height={"100%"}
                    alignContent={"space-between"}
                    justifyContent={"space-between"}
                >
                    <Stack gap={2}>
                        <FilledTextField
                        helperText={helperText}
                        inputRef={signUpUsername}
                        placeholder="Hello!"
                        label="Full name"
                        type="text"
                        />
                        <FilledTextField
                            inputRef={signUpEmail}
                            placeholder="someone@somewhere.com"
                            label="Your email"
                            type="email"
                            />
                        <FilledTextFieldPassword
                        // error = {true}
                            helperText={helperText}
                            inputRef={signUpPassword}
                            placeholder={"AaBbCc@$%#000"}
                            label={"Set password"}
                            type="password"
                        />

                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            justifyContent={"right"}
                        >
                            <RoundedButton onClick={handleChange}>
                                Next <ArrowForwardIcon sx={{ marginLeft: 1 }} />{" "}
                            </RoundedButton>
                        </Stack>
                    </Stack>
                    {/* <a href="#">
                        <Stack direction={"row"}>
                            <ChevronLeftIcon />
                            Already have an account? Login
                        </Stack>
                    </a> */}
                </Stack>
            </form>
        </motion.div>
    );
};

export default SignUpForm;
