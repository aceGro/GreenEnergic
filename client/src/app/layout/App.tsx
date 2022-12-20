import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#FAFAFA" : "#121212",
      },
    },
  });

  function handleThemechange() {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header
          darkMode={darkMode}
          handleThemechange={handleThemechange}
        ></Header>

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
