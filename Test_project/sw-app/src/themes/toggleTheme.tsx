import {Button, Menu, ToggleThemeButton, useStore, useTheme, useTranslate} from "react-admin";
import {useEffect, useMemo, useState} from "react";
import ToggleButton from '@mui/material/ToggleButton';
// @ts-ignore
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";

function DarkModePreferredStatus() {
    const [theme, setTheme] = useTheme();
    const [prefersDarkMode, setPrefersDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    )

    useEffect(() => {
        function handleDarkModePrefferedChange() {
            const doesMatch = window.matchMedia("(prefers-color-scheme: dark)").matches

            setTheme(doesMatch ? 'dark' : 'light')
            setPrefersDarkMode(doesMatch)
        }

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleDarkModePrefferedChange)

        //good house keeping to remove listener, good article here https://www.pluralsight.com/guides/how-to-cleanup-event-listeners-react
        return () => {
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", handleDarkModePrefferedChange)
        }
    }, [])

    return prefersDarkMode
}

const DarkModeBrowserPref = () => {
    let isDark = DarkModePreferredStatus()


    const [theme, setTheme] = useTheme();

    return (
        /*
        <ToggleButton sx={{bgcolor: "background.paper", borderColor: "primary.light", fontSize: "1.5rem", "&:hover": {bgcolor: "primary.light", fontSize: "1.5rem"}}}
            //selected={theme === 'dark'}
            onChange={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');}}
            aria-label="Dark mode toggle"
         value={theme === 'dark'}>
            {theme === 'light' ? "🌙" :  "🔆" }
        </ToggleButton>
        */
        <ToggleThemeButton/>
    );

}
export default DarkModeBrowserPref