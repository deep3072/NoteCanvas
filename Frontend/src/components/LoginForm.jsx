import { Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import FilledTextField from "./FilledTextField";
import FilledTextFieldPassword from "./FilledTextFieldPassword";
import RoundedButton from "./RoundedButton";


import { motion } from "framer-motion";

const LoginForm = ({ checkForm }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  function handleLogin() {
    console.log(loginEmailRef.current.value);
    console.log(loginPasswordRef.current.value);
  

    const handleValidation = () => {
      console.log(loginPasswordRef.current.value);


      
      const regexUpperCase = /[A-Z]/;
      const regexLowerCase = /[a-z]/;
      const regexNumber = /[0-9]/;
      const regexSpecial = /[^A-Za-z0-9]/;

      if (loginPasswordRef.length < 8) {
        setError(true);
        setHelperText('loginPasswordRef must be at least 8 characters long');
    } else if (!regexUpperCase.test(loginPasswordRef)) {
        setError(true);
        setHelperText('loginPasswordRef must contain at least one uppercase letter');
    } else if (!regexLowerCase.test(loginPasswordRef)) {
        setError(true);
        setHelperText('loginPasswordRef must contain at least one lowercase letter');
    } else if (!regexNumber.test(loginPasswordRef)) {
        setError(true);
        setHelperText('loginPasswordRef must contain at least one number');
    } else if (!regexSpecial.test(loginPasswordRef)) {
        setError(true);
        setHelperText('loginPasswordRef must contain at least one special character');
    } else {
        setError(false);
        setHelperText('');
    }   

};
     const checkBoth = () => {
      if (loginEmailRef && loginPasswordRef) {
        // Both fields are not null
        // Your logic here
        console.log("Both fields are not null");
       } 
      else {
        // At least one field is null
        console.log("Both fields should be entered");
       }
     };
    



  }
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -200,
        opacity: 0,
      }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      {/* LOGIN FORM */}
      <Typography
        variant="h6"
        fontWeight={600}
        borderLeft={"0px"}
        borderRight={"0px"}
      >
        Log into your canvas
      </Typography>
      <form id="loginForm" height={"100%"} style={{ flex: 1 }}>
        <Stack
          height={"100%"}
          alignContent={"space-between"}
          justifyContent={"space-between"}
        >
          <Stack gap={2}>
            <FilledTextField
              inputRef={loginEmailRef}
              placeholder="someone@somewhere.com"
              label="Email"
              type="email"
            />
            <FilledTextFieldPassword
              inputRef={loginPasswordRef}
              placeholder={"Password"}
              label={"Password"}
              type="password"
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <RoundedButton onClick={handleLogin}>Login</RoundedButton>
              <a href="">Trouble signing in? </a>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </motion.div>
  );
};

export default LoginForm;
