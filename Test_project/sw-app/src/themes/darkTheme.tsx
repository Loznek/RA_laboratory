import red from "@mui/material/colors/red";
import {defaultTheme} from "react-admin";
import amber from "@mui/material/colors/amber";
import yellow from "@mui/material/colors/yellow";
import orange from "@mui/material/colors/orange";

export const darkTheme = {
        ...defaultTheme,
        palette: {
            mode: 'dark',
            primary: {
                light:'#ECE8D6',
                main: '#f7ff33',
            },
            background: {
                default: '#252525',
                paper: '#000000',
            },
            secondary: yellow,
            error: red,
        },
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Arial',
                'sans-serif',
            ].join(','),
        },
        components: {
            ...defaultTheme.components,
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined' as const,
                },
            },
            MuiFormControl: {
                defaultProps: {
                    variant: 'outlined' as const,
                },
            },
        },
    };



export const lightTheme = {
    ...defaultTheme,
    palette: {
        mode: 'light',
        primary: {
            light:'#1F72B8',
            main: '#112756',
        },
        background: {
            default: '#ECE8D6',
            paper: '#eceaab',
        },
        secondary: yellow,
        error: red,
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
    },
};