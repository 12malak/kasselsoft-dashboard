import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";


import Contacts from "./scenes/contacts";

import Form from "./scenes/form";


import FAQ from "./scenes/faq";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs/Blogs";
import Career from "./pages/Career/Career";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Home from "./pages/Home/Home";
import { useLocation } from "react-router-dom";
import UpdateMainHome from "./pages/Home/UpdateMainHome";

const DirectionHandler = () => {
  const location = useLocation();

  const lang = location.pathname.split('/')[1] || 'en'; // Get the language from the path, default to 'en'
  useEffect(() => {
    document.body.classList.remove('ltr', 'rtl'); // Remove previous direction classes
    document.body.classList.add(lang === 'ar' ? 'rtl' : 'ltr'); // Add new direction class
  }, [lang]);

  return null;
};
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <DirectionHandler /> {/* Handle direction change */}
            <Routes>
              <Route path="/:lang" element={<Dashboard />} />
             
              <Route path="/contacts" element={<Contacts />} />
             
              <Route path="/form" element={<Form />} />
             
           
             
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
           
              <Route path="/contact" element={<Contact />} />

              {/* Add more routes here */}
              <Route path="/career" element={<Career />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/:lang/about" element={<About />} />
              <Route path="/:lang/services" element={<Services />} />
              <Route path="/:lang/home" element={<Home />} />
              <Route path="/:lang/updatemainhome" element={<UpdateMainHome />} />
            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
