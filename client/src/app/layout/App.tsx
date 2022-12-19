import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [darklMode, setDarkMode] = useState(false);
  const paletteType = darklMode ? 'dark' : 'light'
const theme = createTheme({
  palette: {
    mode: paletteType,
    background: {
      default: paletteType === 'light' ? '#eaeaea' : '#121212'
    }
  }
})

function handleThemechange() {
  setDarkMode(!darklMode);
}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Header darkMode={darklMode} handleThemechange={handleThemechange}></Header>

      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
