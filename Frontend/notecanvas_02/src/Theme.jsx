import { createTheme } from "@mui/material";

const commonTheme = {
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },
};

export function getTheme(themeName) {
    return createTheme({
        ...commonTheme,
        palette: {
            type: themeName,
            primary: {
                main: "#FF5300",
                light: "#FF5300",
                dark: "#FF5300",
                contrastText: "#000000",
            },
            text: {
                primary: themeName === "light" ? "#0A0A0A" : "#F5F5F5",
                secondary: themeName === "light" ? "#0A0A0A80" : "#F5F5F580",
                tertiary: themeName === "light" ? "#0A0A0A60" : "#F5F5F560",
                quaternary: themeName === "light" ? "#0A0A0A40" : "#F5F5F540",
            },
        },
    });
}
