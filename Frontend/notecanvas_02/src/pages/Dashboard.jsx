import React, { useEffect, useState } from "react";
import {
    Stack,
    Container,
    Avatar,
    Typography,
    IconButton,
    Box,
    Button,
} from "@mui/material";
import UserAvatar from "../components/UserAvatar";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import RoundedButton from "../components/RoundedButton";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import SpaceItemCard from "../components/SpaceItemCard";
import OnlineUserCard from "../components/OnlineUserCard";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NewLogo from "../assets/new_logo@3x.png";
import NewSpaceDialog from "../components/NewSpaceDialog";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    // logout function
    const handleLogout = async () => {
        console.log("Logout clicked!");
        try {
            const response = await fetch('http://127.0.0.1:8000/accounts/logout/', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request. Needed for sessions.
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token header if necessary for your backend
                },
            });

            if (response.ok) {
                // Logout successful
                console.log("Logged out successfully.");
                navigate("/");
                // Optionally redirect the user or update the UI state
                // window.location.href = '/login';
            } else {
                // Handle server-side validation error messages, etc.
                console.log("Logout failed:", response.status);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Lists of spaces and online users (rn static but will be fetched from backend) - useEffect
    // const [spacesList, setSpacesList] = React.useState([
    //     {
    //         id: 1,
    //         title: "Web Dev Project Brainstorming",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 2,
    //         title: "Sequences and Series",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 3,
    //         title: "Design Inspo",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 4,
    //         title: "Overlapping Squares and Circles",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 5,
    //         title: "Food Blog Ideas",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 6,
    //         title: "Tentative Component List",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 7,
    //         title: "Sleep Walking Ideas",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    //     {
    //         id: 8,
    //         title: "Space 8",
    //         timestamp: "4:42 PM 12/12/2021",
    //     },
    // ]);
    const [spacesList, setSpacesList] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchCanvases = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/dashboard/', {
                    method: 'POST',
                    credentials: 'include', // Include cookies in the request. Needed for sessions.
                    headers: {
                        'Content-Type': 'application/json',
                        // Include CSRF token header if necessary for your backend
                    },
                });
                // console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setSpacesList(data.canvases.map(canvas => ({
                        ...canvas,
                        // timestamp: new Date(canvas.timestamp).toLocaleString() // Formats the timestamp
                        // timestamp: new Date(canvas.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" })
                    })));
                    setUserName(data.userName);

                } else {
                    console.log("Failed to fetch canvases:", response.status);
                    
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching canvases:", error);
                navigate("/");
            }
        };

        fetchCanvases();
    }, []);

    const [onlineUsers, setOnlineUsers] = React.useState([
        {
            id: 1,
            name: "Michael Scott",
        },
        {
            id: 2,
            name: "Dwight Schrute",
        },
        {
            id: 3,
            name: "Jim Halpert",
        },
        {
            id: 4,
            name: "Pam Beesly",
        },
        {
            id: 5,
            name: "Ryan Howard",
        },
    ]);

    // const [currentSortOrder, setCurrentSortOrder] = React.useState("time");
    // Spaces Functions to handle add, delete and click on
    const handleAddNewSpace = async (newCanvasName) => {
        console.log("BLALALAL Add new space clicked!");
        // new space will be added to the spaces list
        // mui dialog will be used to get the title of the space
        // const newId = spacesList.length + 1;

        // setSpacesList((prevSpacesList) => [
        //     ...prevSpacesList,
        //     {
        //         id: newId,
        //         title: `Space ${newId}`,
        //         timestamp: "4:42 PM 12/12/2021",
        //     },
        // ]);
        // // convert form data to json
        // const data = {
        //     canvasName: canvasName,
        // };

        // if newCanvasName is blank set it to "New Canvas"

        if (newCanvasName === "") {
            newCanvasName = "Untitled";
        }

        const data = {

            title: newCanvasName, // Use the correct attribute name as per your backend model
        };

        console.log("Title", data.title);
        try {
            const response = await fetch('http://127.0.0.1:8000/canvas/create/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            const responseText = await response.text();
            if (response.ok) {
                const newCanvas = JSON.parse(responseText);
                setSpacesList(prevSpacesList => [
                    ...prevSpacesList,
                    {
                        id: newCanvas.order,
                        title: newCanvas.title,
                        timestamp: newCanvas.timestamp,
                    },
                ]);
            } else {
                console.log("Failed to create new canvas:", response.status, responseText);
            }
        } catch (error) {
            console.error("Error creating new canvas:", error);
        }
        handleClose();
    };

    const handleSpaceClick = (id) => {
        // onClick will be used to navigate to the space
        console.log(`Space ${id} clicked!`);
        console.log(`http://127.0.0.1:8000/canvas/get/${id}`);
        // const navigate1 = useNavigate();  // Get the navigate function from useNavigate hook
        // console.log("After navigate");

        const fetchDataAndNavigate = async () => {
            console.log(`Preparing to go to ${id}`);

            try {
                const response = await fetch(`http://127.0.0.1:8000/canvas/get/${id}/`, {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies for session management are included
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Canvas data:', data);
                    // Navigate to a canvas page and pass the fetched data
                    navigate(`/canvas/${id}/`, { state: { canvasData: data } });
                } else {
                    console.error('Failed to fetch canvas data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching canvas data:', error);
            }
        };
        // // console.log("Before call");
        // // Since hooks cannot be called inside callbacks or conditions
        // // we call a separate async function defined within the handler
        fetchDataAndNavigate();
    };

    const handleSpaceDelete = (id) => {
        // onDelete will be used to delete the space using the id
        console.log(`Attempting to delete Space ${id}`);

        // Define the URL of the delete endpoint
        const url = `http://127.0.0.1:8000/canvas/delete/${id}/`; // Adjust this URL to your actual endpoint

        // Make a fetch request to delete the canvas
        fetch(url, {
            method: 'DELETE', // Use DELETE method
            credentials: 'include', // Ensure cookies are included if using sessions
            headers: {
                'Content-Type': 'application/json', // Set the appropriate content type
            },
        })
            .then(response => {
                if (response.ok) {
                    // If the delete was successful, filter the canvas out of the local state
                    setSpacesList(prevSpacesList => {
                        const updatedSpacesList = prevSpacesList.filter(space => space.id !== id)
                            .map((space, index) => ({
                                ...space,
                                id: index + 1 // Recalculate ID based on the new index
                            }));
                        console.log(`Space ${id} deleted successfully!`);
                        console.log(`Updated list length: ${updatedSpacesList.length}`);
                        return updatedSpacesList;
                    });
                    console.log(`Space ${id} deleted successfully!`);
                    console.log(id);
                } else {
                    // Log error if the server responded with an error
                    console.error(`Failed to delete Space ${id}:`, response.status);
                }
            })
            .catch(error => {
                // Log any errors that occurred during the fetch
                console.error(`Error deleting Space ${id}:`, error);
            });
        // navigate('/dashboard');
    };

    // Online Users Functions to handle click on options
    const handleOption1 = () => {
        console.log("Option 1 clicked!");
    };

    const handleOption2 = () => {
        console.log("Option 2 clicked!");
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 10,
                display: "flex",
                flexDirection: "column",
                // height: "100vh",
            }}
        >
            <Stack alignItems={"center"} spacing={0.5}>
                <Box bgcolor={"#696969"} px={1} pt={0.8} borderRadius={4}>
                    <img src={NewLogo} height={50} width={50} />
                </Box>
                <Typography fontFamily={"poppins"} color={"white"}>
                    NoteCanvas
                </Typography>
            </Stack>
            <Stack
                height={100}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Stack direction={"row"} alignItems={"center"}>
                    <Avatar
                        // onClick={handleClick}
                        sx={{
                            height: 80,
                            width: 80,
                            borderRadius: "50%",
                            color: "#ffffff",
                            backgroundColor: "#2C2C2C",
                            border: "1px #3F3F3F solid",
                            fontSize: "30px"
                        }}
                    > {userName[0]}</Avatar>
                    <Typography
                        ml={2}
                        variant="h4"
                        fontWeight={500}
                        fontFamily={"Poppins"}
                        color={"white"}
                    >
                        @{userName}
                    </Typography>
                </Stack>

                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <IconButton
                        onClick={() => console.log("Theme button clicked")}
                        sx={{ color: "white", backgroundColor: "#484848" }}
                    >
                        <DarkModeOutlinedIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => console.log("Theme button clicked")}
                        sx={{ color: "white", backgroundColor: "#484848" }}
                    >
                        <TuneOutlinedIcon />
                    </IconButton>
                    <RoundedButton
                        borderRadius="20px"
                        bgcolor="#484848"
                        onClick={handleLogout}
                    >
                        <Stack
                            direction="row"
                            alignItems={"center"}
                            spacing={1}
                        >
                            <Typography
                                fontFamily={"Poppins"}
                                color={"white"}
                                variant="body2"
                            >
                                Logout
                            </Typography>
                            <LogoutOutlinedIcon />
                        </Stack>
                    </RoundedButton>
                </Stack>
            </Stack>

            <Stack direction={"row"} spacing={2} mt={5}>
                <Stack
                    flexGrow={1}
                    // border={1}
                    // mt={5}
                    // bgcolor={"yellowgreen"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    px={2}
                >
                    <Typography
                        fontFamily={"poppins"}
                        color={"#ffffff70"}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        Your spaces
                        <Box
                            ml={1}
                            display={"inline-flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontSize={13}
                            borderRadius={20}
                            width={30}
                            height={30}
                            bgcolor={"#ffffff30"}
                        >
                            {spacesList.length}
                        </Box>
                    </Typography>
                    <NewSpaceDialog
                        handleNewSpaceCreation={handleAddNewSpace}
                    />
                </Stack>
                <Stack
                    // border={1}
                    mt={5}
                    // bgcolor={"yellowgreen"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    width={300}
                >
                    <Typography
                        fontFamily={"poppins"}
                        color={"#ffffff70"}
                        display={"flex"}
                        alignItems={"center"}
                        pl={2}
                    >
                        Users online
                        <Box
                            ml={1}
                            display={"inline-flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            fontSize={13}
                            borderRadius={20}
                            width={30}
                            height={30}
                            bgcolor={"#ffffff30"}
                        >
                            {onlineUsers.length}
                        </Box>
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={2} mt={1}>
                <Stack
                    flexGrow={1}
                    spacing={0.5}
                    height={620}
                    overflow={"scroll"}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#ffffff30",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {spacesList.map((space) => (
                        <SpaceItemCard
                            key={space.id}
                            id={space.id}
                            title={space.title}
                            timestamp={space.timestamp}
                            onClick={() => handleSpaceClick(space.id)}
                            // onClick={() => console.log(space.id)}
                            onDelete={() => handleSpaceDelete(space.id)}
                        />
                    ))}
                    <Typography
                        variant={"body2"}
                        fontStyle={"italic"}
                        color={"#ffffff30"}
                        p={2}
                        fontFamily={"poppins"}
                        textAlign={"center"}
                    >
                        • • • <br />
                        End of list
                    </Typography>
                </Stack>
                <Stack
                    spacing={0.5}
                    height={620}
                    overflow={"scroll"}
                    mt={5}
                    width={300}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: "#ffffff30",
                            borderRadius: "24px",
                        },
                    }}
                >
                    {onlineUsers.map((user) => (
                        <OnlineUserCard
                            key={user.id}
                            id={user.id}
                            username={user.name}
                            onClickOption1={handleOption1}
                            onClickOption2={handleOption2}
                        />
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

export default Dashboard;
