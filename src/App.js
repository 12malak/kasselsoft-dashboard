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
import Contact from "./pages/Contact/Contact";
import Add from "./pages/Contact/Add";
import UpdateContact from "./pages/Contact/UpdateContact";
import InfContact from "./pages/Contact/InfContact";
import Blogs from "./pages/Blogs/Blogs";
import Career from "./pages/Career/Career";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Home from "./pages/Home/Home";
import { useNavigate,useLocation } from 'react-router-dom';
import UpdateMainHome from "./pages/Home/UpdateMainHome";
import UpdateServicesHome from "./pages/Home/UpdateServicesHome";
import WhyChooseUs from "./pages/Home/WhyChooseUs";
import UpdateWhyChooseUs from "./pages/Home/UpdateWhyChooseUs";
import UpdateCardHome from "./pages/Home/UpdateCardHome";
import TeamAbout from "./pages/About/TeamAbout";
import UpdateTeam from "./pages/About/UpdateTeam";
import AddTeam from "./pages/About/AddTeam";

import UpdateServicesAbout from "./pages/About/UpdateServicesAbout";
import AddImgSliderHome from "./pages/Home/AddImgSliderHome";
import LastTwoSection from "./pages/Home/LastTwoSection";
import UpdateCareersHome from "./pages/Home/UpdateCareersHome";
import UpdateExperienceHome from "./pages/Home/UpdateExperienceHome";
import AddExperienceSlider from "./pages/Home/AddExperienceSlider";
import Titles from "./pages/Titles/Titles";
import UpdateTitles from "./pages/Titles/UpdateTitles";
import AddServices from "./pages/Services/AddServices";
import UpdateServices from "./pages/Services/UpdateServices";
import UpdateHowWeWork from "./pages/Services/UpdateHowWeWork";
import AddIndustryImg from "./pages/Services/AddIndustryImg";
import UpdateBackgrounPath from "./pages/Titles/UpdateBackgroundPath";
import UpdateFooterContact from "./pages/Contact/UpdateFooterContact";
import AddCareer from "./pages/Career/AddCareer";
import UpdateCareer from "./pages/Career/UpdateCareer";
import AddBlog from "./pages/Blogs/AddBlog";
import UpdateBlog from "./pages/Blogs/UpdateBlog";
import TermsAndCondition from "./pages/TermsAndCondition/TermsAndCondition";
import UpdateTermsAndCondition from "./pages/TermsAndCondition/UpdateTermsAndCondition";
import AddBlackTerms from "./pages/TermsAndCondition/AddBlackTerms";
import UpdateBlackTerms from "./pages/TermsAndCondition/UpdateBlackTerms";
import AddBlueTerms from "./pages/TermsAndCondition/AddBlueTerms";
import UpdateBlueTerms from "./pages/TermsAndCondition/UpdateBlueTerms";
import UpdateAbout from "./pages/About/UpdateAbout";
import AddServicesAbout from "./pages/About/AddServicesAbout";


const RedirectToDefaultLanguage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/en'); // Redirect to default language
    }
  }, [navigate, location.pathname]);

  return null;
};
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
            <RedirectToDefaultLanguage />

            <Routes>
              <Route path="/:lang" element={<Dashboard />} />
             
              <Route path="/contacts" element={<Contacts />} />
             
              <Route path="/form" element={<Form />} />
             
           
             
              <Route path="/faq" element={<FAQ />} />
              <Route path="/:lang/calendar" element={<Calendar />} />
           
              <Route path="/:lang/contact" element={<Contact />} />

              {/* Add more routes here */}
              <Route path="/:lang/career" element={<Career />} />
              <Route path="/:lang/addcareer" element={<AddCareer />} />
              <Route path="/:lang/updatecareer" element={<UpdateCareer />} />
              <Route path="/:lang/blogs" element={<Blogs />} />
              <Route path="/:lang/addblog" element={<AddBlog />} />
              <Route path="/:lang/updateblog" element={<UpdateBlog />} />
              {/* pages route */}
              <Route path="/:lang/about" element={<About />} />
              <Route path="/:lang/updateabout" element={<UpdateAbout />} />
              <Route path="/:lang/addservicesabout" element={<AddServicesAbout />} />
              <Route path="/:lang/services" element={<Services />} />
              <Route path="/:lang/addservices" element={<AddServices />} />
              <Route path="/:lang/updateservices" element={<UpdateServices />} />
              <Route path="/:lang/updatehowwework" element={<UpdateHowWeWork />} />
              <Route path="/:lang/addindustryimg" element={<AddIndustryImg />} />
              <Route path="/:lang/updatebackgroundpath" element={<UpdateBackgrounPath />} />
              <Route path="/:lang/termsandcondition" element={<TermsAndCondition />} />
              <Route path="/:lang/updatetermsandcondition" element={<UpdateTermsAndCondition />} />
              <Route path="/:lang/addblackterms" element={<AddBlackTerms />} />
              <Route path="/:lang/updateblackterms" element={<UpdateBlackTerms />} />
              <Route path="/:lang/addblueterms" element={<AddBlueTerms />} />
              <Route path="/:lang/updateblueterms" element={<UpdateBlueTerms />} />


              <Route path="/:lang/infContact" element={<InfContact />} />
              <Route path="/:lang/updatefooter" element={<UpdateFooterContact />} />
              <Route path="/:lang/titles" element={<Titles />} />
              <Route path="/:lang/updatetitle" element={<UpdateTitles />} />

              <Route path="/:lang/updateContact" element={<UpdateContact />} />  
              <Route path="/:lang/updateTeam" element={<UpdateTeam />} /> 
              <Route path="/:lang/updateServicesAbout" element={<UpdateServicesAbout />} />
              <Route path="/:lang/addTeam" element={<AddTeam />} />   
              <Route path="/:lang/add" element={<Add />} />
              <Route path="/:lang/teamAbout" element={<TeamAbout />} />
              {/* home routes */}
              <Route path="/:lang/home" element={<Home />} />
              <Route path="/:lang/updatemainhome" element={<UpdateMainHome />} />
              <Route path="/:lang/updateserviceshome" element={<UpdateServicesHome />} />
              <Route path="/:lang/whychooseus" element={<WhyChooseUs />} />
              <Route path="/:lang/updatewhychooseus" element={<UpdateWhyChooseUs />} />
              <Route path="/:lang/updatecardhome" element={<UpdateCardHome />} />
              <Route path="/:lang/addimgslider" element={<AddImgSliderHome />} />
              <Route path="/:lang/lasttwosection" element={<LastTwoSection />} />
              <Route path="/:lang/updatecareershome" element={<UpdateCareersHome />} />
              <Route path="/:lang/updateexphome" element={<UpdateExperienceHome />} />
              <Route path="/:lang/addexphome" element={<AddExperienceSlider />} />

            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
