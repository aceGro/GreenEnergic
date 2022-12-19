import { Typography } from "@mui/material";
import { Switch } from "@mui/material";
import { Toolbar } from "@mui/material";
import { AppBar } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemechange: () => void;
}

export default function Header({darkMode, handleThemechange}: Props) {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant="h6">
                    GREEN-ENERGIC
                </Typography>
                <Switch checked={darkMode} onChange={handleThemechange} />
            </Toolbar>
        </AppBar>
    )
}