import {
    Container,
    Stack,
    Typography,
    Box,
    Avatar,
    Grid,
    TextField,
    Input,
    inputClasses,
    Button,
    FilledInput,
} from "@mui/material";
import React, { useState } from "react";
import LoginPageCard from "../components/LoginPageCard";
import LogoOrange from "../assets/logo_orange.svg";
import InDevelopmentTypo from "../assets/in_development_typo.png";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Developers from "../components/Developer";
import Developer from "../components/Developer";
import Tag from "../components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import OrangeBlobBG from "../assets/bg-blob.svg";
import GridElement from "../assets/plus-grid-element.png";
import Notes3D from "../assets/notes-3d.png";
import zIndex from "@mui/material/styles/zIndex";

import FilledTextFieldPassword from "../components/FilledTextFieldPassword";
import FilledTextField from "../components/FilledTextField";
import RoundedButton from "../components/RoundedButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import TentativeFeaturesCard from "../components/TentativeFeaturesCard";

const Login = () => {
    const [showSignUpFormView, setShowSignUpFormView] = useState(false);

    function handleFormView() {
        if (showSignUpFormView) {
            // setFormView();
            setShowSignUpFormView(!showSignUpFormView);
            console.log(showSignUpFormView);
        } else {
            setShowSignUpFormView(!showSignUpFormView);
            console.log(showSignUpFormView);
        }
    }

    return (
        <>
            <Stack
                sx={{
                    backgroundImage: { OrangeBlobBG },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                height={"calc(87vh)"}
                alignContent={"center"}
                justifyContent={"center"}
                padding={10}
                flexWrap={"wrap"}
            >
                {/* ----TOP ROW---- */}
                <Stack direction="row">
                    {/* ----TITLE CARD---- */}
                    <LoginPageCard
                        bgcolor={"#FFB59150"}
                        borderRadius={"50px 50px 0px 50px"}
                        // width={350}

                        height={350}
                    >
                        <Stack>
                            <div>
                                <img src={LogoOrange} height={112} alt="" />
                            </div>

                            <Typography variant="h4" fontWeight={600}>
                                NoteCanvas
                            </Typography>
                        </Stack>

                        <div>
                            Esse pariatur proident sunt irure irure. Ullamco
                            aliqua adipisicing incididunt Lorem ea aliqua. Esse
                            aute amet exercitation voluptate adipisicing do sint
                            esse ex exercitation.
                        </div>
                    </LoginPageCard>

                    {/* ----FEATURES CARD---- */}
                    <TentativeFeaturesCard />

                    {/* ----LOGIN CARD---- */}
                    <LoginPageCard
                        borderRadius={"50px 50px 0px 50px"}
                        height={350}
                        // bgcolor="#FF5300"
                        // border={1}
                    >
                        <Stack justifyContent={"space-between"} height={"100%"}>
                            <AnimatePresence>
                                {showSignUpFormView ? (
                                    <SignUpForm />
                                ) : (
                                    <LoginForm />
                                )}
                            </AnimatePresence>
                            {showSignUpFormView ? (
                                <a href="#" onClick={handleFormView}>
                                    <Stack direction={"row"}>
                                        <ChevronLeftIcon />
                                        Already have an account? Login
                                    </Stack>
                                </a>
                            ) : (
                                <a href="#" onClick={handleFormView}>
                                    <Stack
                                        direction="row"
                                        justifyContent={"right"}
                                    >
                                        Or create a new account
                                        <ChevronRightIcon />
                                    </Stack>
                                </a>
                            )}
                        </Stack>
                    </LoginPageCard>
                </Stack>
                {/* ----TOP ROW ENDS---- */}
                {/* ----BOTTOM ROW STARTS---- */}
                <Stack direction={"row"}>
                    {/* ----STATUS CARD---- */}
                    {/* <motion.div></motion.div> */}
                    <LoginPageCard
                        borderRadius={"50px 50px 0px 50px"}
                        padding={3.5}
                        flex={2}
                        height={350}
                        bgImage={Notes3D}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={600}
                            borderLeft={"0px"}
                            borderRight={"0px"}
                        >
                            Status
                        </Typography>
                        <motion.div
                            initial={{ opacity: 0, x: 200, border: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                            }}
                            transition={{ duration: 1, ease: "backInOut" }}
                        >
                            <Typography
                                variant="h1"
                                fontWeight={600}
                                lineHeight={0.8}
                                borderLeft={"0px"}
                                borderRight={"0px"}
                            >
                                In developement
                            </Typography>
                        </motion.div>

                        <Stack
                            borderLeft={"0px"}
                            borderRight={"0px"}
                            direction={"row"}
                            gap={5}
                        >
                            <Stack>
                                <strong>Currently working on</strong>
                                <p>User Login & registration</p>
                            </Stack>
                            <Stack>
                                <strong>Upcoming</strong>
                                <p>
                                    Note taking <br />
                                    Canvas UI <br />
                                    Account settings/preferences
                                </p>
                            </Stack>
                        </Stack>
                    </LoginPageCard>

                    {/* ----DEVELOPERS CARD---- */}
                    <LoginPageCard
                        // bgcolor={"#FFB591"}
                        borderRadius={"50px 50px 50px 0px"}
                        // width={350}
                        height={350}
                        // flex={1}
                    >
                        <Stack>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                borderLeft={"0px"}
                                borderRight={"0px"}
                            >
                                Developers
                            </Typography>

                            <Stack
                                paddingTop={3}
                                direction={"row"}
                                justifyContent={"space-around"}
                                flexWrap={"wrap"}
                                gap={3}
                                // border={1}
                            >
                                <Developer
                                    name="Neha Pathak"
                                    description="Frontend/Code"
                                />
                                <Developer
                                    name="Shubhdeep Sarkar"
                                    description="Frontend/Design"
                                />
                                <Developer
                                    name="Surbhi Sharma"
                                    description="Backend"
                                />
                                <Developer
                                    name="Deep Shah"
                                    description="Backend"
                                />
                            </Stack>
                        </Stack>
                    </LoginPageCard>
                </Stack>
            </Stack>
        </>
    );
};

export default Login;
