// import React, { useState, useEffect } from "react";
// import {
//   Stack,
//   Box,
//   Typography,
//   IconButton,
//   Select,
//   MenuItem,
//   Menu,
//   Avatar,
//   Button,
// } from "@mui/material";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// const Preferences = () => {
//   const [showAs, setShowAs] = useState("Online");
//   const [theme, setTheme] = useState(() => {
//     // Retrieve the theme from localStorage or use a default theme
//     return localStorage.getItem("theme") || "Blueprint";
//   });
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     applyTheme(theme);
//   }, [theme]);

//   const applyTheme = (selectedTheme) => {
//     const root = document.documentElement;
//     switch (selectedTheme) {
//       case "Light":
//         root.style.setProperty("--primary-color", "#ffffff");
//         root.style.setProperty("--background-color", "#f0f0f0");
//         root.style.setProperty("--text-color", "#000000");
//         break;
//       case "Dark":
//         root.style.setProperty("--primary-color", "#333333");
//         root.style.setProperty("--background-color", "#121212");
//         root.style.setProperty("--text-color", "#ffffff");
//         break;
//       case "Blueprint":
//         root.style.setProperty("--primary-color", "#2196f3");
//         root.style.setProperty("--background-color", "#eeeeee");
//         root.style.setProperty("--text-color", "#333333");
//         break;
//       default:
//         // Default theme
//         root.style.setProperty("--primary-color", "#333333");
//         root.style.setProperty("--background-color", "#ffffff");
//         root.style.setProperty("--text-color", "#000000");
//         break;
//     }
//   };

//   const handleThemeChange = (newTheme) => {
//     // Save the selected theme in localStorage
//     localStorage.setItem("theme", newTheme);

//     // Update the theme state
//     setTheme(newTheme);
//   };

//   const handleShowAsChange = (newShowAs) => {
//     setShowAs(newShowAs);
//   };

//   const handleUpdatePassword = () => {
//     if (currentPassword && newPassword && confirmPassword) {
//       if (newPassword === confirmPassword) {
//         console.log("Password updated successfully");
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//       } else {
//         console.log("New password and confirm password do not match");
//       }
//     } else {
//       console.log("Please fill in all password fields");
//     }
//   };

//   const handleDeleteAccount = () => {
//     // Assuming you have some authentication service or API endpoint to delete the account
//     // You would typically make a request to your backend to delete the account
//     // This is a simplified example
//     fetch('http://127.0.0.1:8000/users/delete/${id}', {
//         method: 'DELETE',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             // Add any authentication headers if needed
//         },
//         // body: JSON.stringify({
//         //     // You might need to include some user identifier or token for authentication
//         //     // For example, if you have a JWT token, you could include it here
//         //     userId: 'user123', // Example user ID
//         //     // Add any other data required for the deletion process
//         // }),
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Account deleted successfully');
//             // Optionally, you can redirect the user to a different page or show a success message
//         } else {
//             console.error('Failed to delete account');
//             // Optionally, you can show an error message to the user
//         }
//     })
//     .catch(error => {
//         console.error('Error deleting account:', error);
//         // Optionally, you can show an error message to the user
//     });
//   };

//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };
//   const handleUpdateUser = (userId, updatedUsername, updatedEmail, updatedFullName, updatedProfilePicture) => {
//     const userData = {
//         username: updatedUsername,
//         email: updatedEmail,
//         full_name: updatedFullName,
//         profile_picture: updatedProfilePicture
//     };

//     fetch(`http://127.0.0.1:8000/users/update/${userId}`, {
//         method: 'PUT',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             // Add any authentication headers if needed
//         },
//         body: JSON.stringify(userData),
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('User updated successfully');
//             // Optionally, you can redirect the user to a different page or show a success message
//         } else {
//             console.error('Failed to update user');
//             // Optionally, you can show an error message to the user
//         }
//     })
//     .catch(error => {
//         console.error('Error updating user:', error);
//         // Optionally, you can show an error message to the user
//     });
// };

//   return (

//     <Box
//       sx={{
//         bgcolor: "#2C2C2C",
//         borderRadius: "16px",
//         p: 3,
//         margin: "0 auto",
//       }}
//     >
//       <Typography>
//         Preferences
//       </Typography>
//       <Box
//         sx={{
//           bgcolor: "#2C2C2C",
//           borderRadius: "16px",
//           p: 3,
//           margin: "0 auto",
//         }}
//       >
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           mb={3}
//         >
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Avatar
//               sx={{
//                 bgcolor: "#484848",
//                 color: "#ffffff",
//               }}
//             >
//               SN
//             </Avatar>
//             <Typography variant="h5" color="white">
//               Some Name
//             </Typography>
//             <Typography variant="body2" color="#ffffff70">
//               someone@somewhere.com
//             </Typography>
//           </Stack>
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Select
//               value={showAs}
//               onChange={(e) => handleShowAsChange(e.target.value)}
//               sx={{
//                 bgcolor: "#484848",
//                 color: "white",
//                 "& .MuiSelect-icon": {
//                   color: "white",
//                 },
//               }}
//             >
//               <MenuItem value="Online">Online</MenuItem>
//               <MenuItem value="Offline">Offline</MenuItem>
//             </Select>
//             <IconButton
//               onClick={handleOpenMenu}
//               sx={{ color: "white", bgcolor: "#484848" }}
//             >
//               <LogoutOutlinedIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleCloseMenu}
//             >
//               <MenuItem onClick={handleDeleteAccount}>
//                 <Stack direction="row" alignItems="center" spacing={1}>
//                   <LogoutOutlinedIcon />
//                   <Typography variant="body2">Delete account</Typography>
//                 </Stack>
//               </MenuItem>
//             </Menu>
//           </Stack>
//         </Stack>

//         <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
//           <Typography variant="h6" color="white" mb={2}>
//             Theme
//           </Typography>
//           <Stack direction="row" spacing={2}>
//             <Button
//               variant={theme === "Light" ? "contained" : "outlined"}
//               onClick={() => handleThemeChange("Light")}
//               sx={{
//                 minWidth: 80,
//                 minHeight: 80,
//                 bgcolor: "#484848",
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: "#555555",
//                 },
//               }}
//             >
//               Light
//             </Button>
//             <Button
//               variant={theme === "Dark" ? "contained" : "outlined"}
//               onClick={() => handleThemeChange("Dark")}
//               sx={{
//                 minWidth: 80,
//                 minHeight: 80,
//                 bgcolor: "#484848",
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: "#555555",
//                 },
//               }}
//             >
//               Dark
//             </Button>
//             <Button
//               variant={theme === "Blueprint" ? "contained" : "outlined"}
//               onClick={() => handleThemeChange("Blueprint")}
//               sx={{
//                 minWidth: 80,
//                 minHeight: 80,
//                 bgcolor: "#484848",
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: "#555555",
//                 },
//               }}
//             >
//               Blueprint
//             </Button>
//           </Stack>
//           <Typography variant="body2" color="#ffffff70" mt={2}>
//             {theme === "Light"
//               ? "Dynamic description text based on the theme selected or hover on. Something funny, witty."
//               : theme === "Dark"
//               ? "Dynamic description text based on the theme selected or hover on. Something funny, witty."
//               : "Dynamic description text based on the theme selected or hover on. Something funny, witty."}
//           </Typography>
//         </Box>

//         <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
//           <Typography variant="h6" color="white" mb={2}>
//             Update password
//           </Typography>
//           <Stack spacing={2}>
//             <input
//               type="password"
//               placeholder="Your current password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               style={{
//                 width: "40%",
//                 padding: "10px",
//                 bgcolor: "#484848",
//                 border: "none",
//                 color: "white",
//                 alignItems:"center"
//               }}
//             />
//             <input
//               type="password"
//               placeholder="Set new password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               style={{
//                 width: "40%",
//                 padding: "10px",
//                 bgcolor: "#484848",
//                 border: "none",
//                 color: "white",
//                 alignItems:"center"
//               }}
//             />
//             <input
//               type="password"
//               placeholder="Confirm"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               style={{
//                 width: "40%",
//                 padding: "10px",
//                 bgcolor: "#484848",
//                 border: "none",
//                 color: "white",
//                 alignItems:"center"
//               }}
//             />
//             <Typography variant="body2" color="#ffffff70">
//               A verification link will be sent your email.
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={handleUpdatePassword}
//               sx={{
//                 bgcolor: "#484848",
//                 color: "white",
//                 width:"43%",
//                 "&:hover": {
//                   bgcolor: "#555555",
                  
//                 },
//               }}
//             >
//               Update password
//             </Button>
//           </Stack>
//         </Box>

//         <Box mb={4} sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
//           <Typography variant="h6" color="white" mb={2}>
//             Delete account
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={handleDeleteAccount}
//             sx={{
//               bgcolor: "#ff4444",
//               color: "white",
//               "&:hover": {
//                 bgcolor: "#e53935",
//               },
//             }}
//           >
//             Delete my account
//           </Button>
//         </Box>

//         <Box sx={{ borderRadius: "8px", bgcolor: "#333333", p: 2 }}>
//           <Typography variant="h6" color="white" mb={2}>
//             Friends
//           </Typography>
//           <Stack spacing={2}>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "#484848",
//                   color: "white",
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 FF
//               </Avatar>
//               <Typography variant="body1" color="white">
//                 First Friend
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "#484848",
//                   color: "white",
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 SF
//               </Avatar>
//               <Typography variant="body1" color="white">
//                 Second Friend
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "#484848",
//                   color: "white",
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 FF
//               </Avatar>
//               <Typography variant="body1" color="white">
//                 Fourth Friend
//               </Typography>
//             </Stack>
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar
//                 sx={{
//                   bgcolor: "#484848",
//                   color: "white",
//                   width: 40,
//                   height: 40,
//                 }}
//               >
//                 FF
//               </Avatar>
//               <Typography variant="body1" color="white">
//                 Fifth Friend
//               </Typography>
//             </Stack>
//           </Stack>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Preferences;
import React, { useState, useEffect } from "react";
import {
    Stack,
    Box,
    Typography,
    IconButton,
    Select,
    MenuItem,
    Menu,
    Avatar,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    FilledInput,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { getTheme } from "../Theme";
import CircleIcon from "@mui/icons-material/Circle";
import FilledTextField from "../components/FilledTextField";
import RoundedButton from "../components/RoundedButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";



const Preferences = () => {
    const [showAs, setShowAs] = useState("Online");
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {}, []);
    // const history = useHistory();


    const handleUpdatePassword = () => {
        if (currentPassword && newPassword && confirmPassword) {
            if (newPassword === confirmPassword) {
                const newPasswordData = {
                    newPassword: newPassword,
                };

                console.log("Password updated successfully", newPasswordData);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                console.log("New password and confirm password do not match");
            }
        } else {
            console.log("Please fill in all password fields");
        }
    };

    const handleDeleteAccount = () => {
        // todo: delete account logic goes here
        fetch('http://127.0.0.1:8000/users/delete/', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // Add any authentication headers if needed
        },
        // body: JSON.stringify({
        //     // You might need to include some user identifier or token for authentication
        //     // For example, if you have a JWT token, you could include it here
        //     userId: 'user123', // Example user ID
        //     // Add any other data required for the deletion process
        // }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Account deleted successfully');
            // Optionally, you can redirect the user to a different page or show a success message
            navigate("/");
        } else {
            console.error('Failed to delete account');
            // Optionally, you can show an error message to the user
        }
    })
    .catch(error => {
        console.error('Error deleting account:', error);
        // Optionally, you can show an error message to the user
    });
  };
    
    // delete confirmation dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                pt: 15,
            }}
        >
          <Stack direction="row" alignItems="center" mb={3}>
            <IconButton onClick={()=>console.log("back button clicked!")}>
              <ArrowBackIosNewIcon sx={{color: "#F5F5F580"}}/>
            </IconButton>
            <Typography color={"#F5F5F580"} fontSize={25} ml={2} >
                Preferences
            </Typography>
          </Stack>
            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C50"} p={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Profile
                </Typography>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Stack
                        direction={"row"}
                        p={2}
                        alignItems={"center"}
                        gap={2}
                    >
                        <Avatar
                            sx={{
                                height: 100,
                                width: 100,
                                borderRadius: "25px",
                                color: "#ffffff50",
                                backgroundColor: "#2C2C2C",
                                border: "1px #3F3F3F solid",
                                fontSize: 35,
                            }}
                        >
                            DS
                        </Avatar>
                        <Box>
                            <Typography variant="h5" color={"#F5F5F5"}>
                                Deep Shah
                            </Typography>
                            <Typography variant="body1" color={"#f5f5f580"}>
                                @deepshah_
                            </Typography>
                            <Box height={10}></Box>
                            <Typography
                                variant="body2"
                                color={"#f5f5f580"}
                                fontWeight={200}
                            >
                                deepshah2000@gmail.com
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack gap={1} alignItems={"end"}>
                        <Typography variant="body2" color={"#f5f5f580"}>
                            Show as
                        </Typography>

                        {/* drop down menu */}
                        <Select
                            value={showAs}
                            onChange={(e) => handleShowAsChange(e.target.value)}
                            sx={{
                                // bgcolor: "red",
                                border: "1px solid #ffffff50",
                                padding: 0,
                                height: 40,
                                width: 150,
                                borderRadius: "40px",
                                color: "white",
                                p: 0,

                                "& .MuiSelect-icon": {
                                    color: "white",
                                    padding: 0,
                                },

                                "& .MuiMenu-paper": {
                                    bgcolor: "blue",
                                },

                                // menu list bg color
                                "& .MuiMenu-list": {
                                    bgcolor: "red",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                },

                                "& .MuiSelect-select": {
                                    width: 150,
                                    borderRadius: "40px",
                                    color: "white",
                                },
                            }}
                        >
                            <MenuItem
                                value="Online"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "green" }} />
                                    <Typography>Online</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem
                                value="Busy"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "yellow" }} />
                                    <Typography>Busy</Typography>
                                </Stack>
                            </MenuItem>
                            <MenuItem
                                value="Offline"
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    color: "white",
                                    p: 1,
                                    margin: 0,
                                }}
                            >
                                <Stack direction={"row"} gap={1}>
                                    <CircleIcon sx={{ color: "red" }} />
                                    <Typography>Offline</Typography>
                                </Stack>
                            </MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Stack>
            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C50"} p={2} mt={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Change passsword
                </Typography>

                <FormControl
                    fullWidth
                    sx={{ mt: 2 }}
                    onSubmit={handleUpdatePassword}
                >
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"start"}
                        gap={2}
                        p={2}
                    >
                        <Stack
                            flex={1}
                            justifyContent={"end"}
                            alignContent={"start"}
                        >
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                name="Set new password"
                                label={"Set new password"}
                                placeholder={"New password"}
                                type={showNewPassword ? "text" : "password"}
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        borderRadius: "15px",
                                        bgcolor: "#2C2C2C",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowNewPassword(
                                                        !showNewPassword
                                                    )
                                                }
                                            >
                                                {showNewPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                name="Confirm new password"
                                label={"Confirm new password"}
                                placeholder={"Repeat password"}
                                // helperText={formErrors.loginPassword}
                                // error={formErrors.loginPassword ? true : false}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                type={
                                    showConfirmNewPassword ? "text" : "password"
                                }
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    mt: 2,
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        borderRadius: "15px",
                                        bgcolor: "#2C2C2C",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowConfirmNewPassword(
                                                        !showConfirmNewPassword
                                                    )
                                                }
                                            >
                                                {showCurrentPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>
                        <Stack flex={1} alignItems={"end"}>
                            <FilledInput
                                disableUnderline
                                hiddenLabel
                                fullWidth
                                name="Current password"
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                value={currentPassword}
                                label={"Current password"}
                                placeholder={"Current password"}
                                type={showCurrentPassword ? "text" : "password"}
                                sx={{
                                    bgcolor: "#2C2C2C",
                                    borderRadius: "15px",
                                    label: { color: "#ffffff50" },
                                    input: {
                                        color: "white",
                                        // borderRadius: "15px",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowCurrentPassword(
                                                        !showCurrentPassword
                                                    )
                                                }
                                            >
                                                {showCurrentPassword ? (
                                                    <VisibilityOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                ) : (
                                                    <VisibilityOffOutlinedIcon
                                                        sx={{
                                                            color: "#ffffff70",
                                                        }}
                                                    />
                                                )}
                                                {/* react button component */}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <RoundedButton
                                bgcolor="black"
                                borderRadius="40px"
                                type="submit"
                                onClick={handleUpdatePassword}
                                mt={3.5}
                            >
                                Update Password
                            </RoundedButton>
                        </Stack>
                    </Stack>
                </FormControl>
            </Stack>

            <Stack borderRadius={"30px"} bgcolor={"#2C2C2C70"} p={2} mt={2}>
                <Typography variant="body2" color={"#F5F5F580"}>
                    Delete account
                </Typography>
                <Stack
                    direction={"row"}
                    // justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                    mt={2}
                    gap={3}
                >
                    <RoundedButton
                        bgcolor="#FF4949"
                        borderRadius="40px"
                        onClick={handleClickOpen}
                        mt="0"
                    >
                        Delete Account
                    </RoundedButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                bgcolor: "#141414",
                                color: "white",
                                borderRadius: "15px",
                                border: "1px #ffffff20 solid",
                            },
                            component: "form",
                            onSubmit: (event) => {
                                event.preventDefault();
                                // const formData = new FormData(event.currentTarget);
                                // const formJson = Object.fromEntries(formData.entries());
                                // const email = formJson.email;
                                // // console.log(email);
                                // handleClose();
                            },
                        }}
                    >
                        <DialogTitle textAlign={"center"}>
                            Are you sure?
                        </DialogTitle>
                        <DialogContent sx={{ width: "300px" }}>
                            <Typography
                                textAlign={"center"}
                                color={"#ffffff70"}
                            >
                                This is an irreversible action. All your data
                                will be delete.
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"}>
                                <RoundedButton onClick={handleClose}>
                                    Cancel
                                </RoundedButton>
                                <Box width={"10px"}></Box>
                                <RoundedButton
                                    bgcolor="#FF4949"
                                    color="white"
                                    onClick={handleDeleteAccount}
                                >
                                    <Stack
                                        direction={"row"}
                                        spacing={1}
                                        alignItems={"center"}
                                    >
                                        <Typography fontFamily={"poppins"}>
                                            Yes!
                                        </Typography>

                                        {/* <CheckIcon /> */}
                                    </Stack>
                                </RoundedButton>

                                {/* <Button type="submit">Subscribe</Button> */}
                            </Box>
                        </DialogContent>
                    </Dialog>
                    <Typography
                        variant="body2"
                        fontStyle={"italic"}
                        color={"#f5f5f580"}
                        width={400}
                    >
                        This is an irreversible action. All your data will be
                        delete.
                    </Typography>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Preferences;