import { ShoppingCart } from "@mui/icons-material";
import {
  ListItem,
  Typography,
  List,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
import { Switch } from "@mui/material";
import { Toolbar } from "@mui/material";
import { AppBar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useStoreContext } from "../context/StoreContext";

interface Props {
  darkMode: boolean;
  handleThemechange: () => void;
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#212121',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#88CC00',
      dark: '#ba000d',
      contrastText: '#FFFFFF',
    },
  },
});

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  textDecoration: "none",
  color: "grey.500",
  typography: "h6",
  "&:hover": {
    color: "#FFFFFF",
  },
  "&.active": {
    //color: "text.secondary",
    color: "#FFFFFF",
  },
};

export default function Header({ darkMode, handleThemechange }: Props) {
  const {basket} = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="sticky" sx={{ mb: 4, color: 'black' }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
          <span style={{ color: "#88CC00" }}>GREEN-ENERGIC</span>
          </Typography>
          <Switch checked={darkMode} onChange={handleThemechange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton component={Link} to='/basket' size="large" sx={{ color: "grey.500" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  );
}
