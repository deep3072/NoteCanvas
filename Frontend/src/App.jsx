import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Canvas from "./pages/Canvas";
import NoteFound from "./pages/NotFound";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import SignUpStepTwo from "./pages/SignUpStepTwo";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: "Satoshi",
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {/* <Login /> */}
            {/* <Canvas /> */}
            <SignUpStepTwo />
        </ThemeProvider>
        // <Router>
        //       <Switch>
        //           <Route path="/" component={Login} />
        //           <Route path="/canvas" component={Canvas} />
        //           <Route component={NoteFound} />
        //       </Switch>
        //   </Router>
    );
}

export default App;
