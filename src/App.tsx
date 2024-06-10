import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import { RecoilRoot, useRecoilValue } from "recoil";
import Document from "./pages/document";
import { ThemeProvider } from "styled-components";
import { isDarkModeState } from "./recoil/recoil";
import { darkTheme, lightTheme } from "./color";
import { Global } from "./global.style";
import { useEffect } from "react";
// import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

function App() {
  const isDarkMode = useRecoilValue(isDarkModeState);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Global />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/document/:id" element={<Document />} />
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
