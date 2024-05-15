import red from "@mui/material/colors/red";
import {defaultTheme} from "react-admin";
import yellow from "@mui/material/colors/yellow";

export const darkTheme = {
        ...defaultTheme,
        palette: {
            mode: 'dark',
            primary: {
                light:'#ECE8D6',
                main: '#f7ff33',
            },
            background: {
                default: '#000000',
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