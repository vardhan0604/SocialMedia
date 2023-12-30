import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom";

import ProfilePage from "scenes/ProfilePage/ProfilePage";
import LoginPage from "scenes/LoginPage/LoginPage";
import Navbar from "scenes/Navbar/Navbar";
import HomePage from "scenes/HomePage/HomePage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import Register from "scenes/Register/Register";

function App() {
  // style={{height:"100%"}}
  const mode=useSelector((state)=>state.mode);
  const theme= useMemo(()=>createTheme(themeSettings(mode)),[mode])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/profile/:userid" element={<ProfilePage />}/> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
