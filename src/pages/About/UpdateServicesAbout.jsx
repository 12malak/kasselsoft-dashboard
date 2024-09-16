import { Box, Button, TextField, Alert, Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../theme";
import {  Typography, useTheme } from "@mui/material";

function UpdateServicesAbout() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ type: "", message: "", visible: false });
    const [AboutServicesId, setAboutServicesId] = useState("");
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { lang } = useParams();
    const [initialValues, setInitialValues] = useState({
        title: "",
        icon: "",
      
    });

    // Set AboutServicesId from location state
    useEffect(() => {
        if (location.state && location.state.id) {
            setAboutServicesId(location.state.id);
            console.log("AboutServicesId:", location.state.id); // Debugging
        } else {
            console.warn("No ID found in location.state");
        }
    }, [location.state]);

    // Fetch team data by id
    useEffect(() => {
        if (AboutServicesId) {
            axios.get(`http://localhost:9090/AboutServices/getbyid/${AboutServicesId}`)
                .then((response) => {
                    const contactData = response.data; // Since data is an object, no need for [0]
                    if (contactData) {
                        setInitialValues({
                            title: contactData.title || "",
                            icon: contactData.icon || "",
                          
                        });
                    } else {
                        console.warn("No data found for the given ID");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching team data:", error);
                });
        }
    }, [AboutServicesId]);
    
    

    const handleFormSubmit = async (values) => {
        try {
            await axios.put(`http://localhost:9090/AboutServices/updateaboutServices/${lang}/${AboutServicesId}`, values);
            setAlert({ open: true, message: lang === 'ar' ? "تم التعديل بنجاح" : "Update successful!", severity: "success" });

            // Delay navigation after success
            setTimeout(() => {
                navigate(`/${lang}/teamAbout`);
            }, 2000);
        } catch (error) {
            console.error(`Error in fetch edit data: ${error}`);
            setAlert({ open: true, message: "Update failed. Please try again.", severity: "error" });
        }
    };

const handleButtonClick = () => {
    window.open('https://icons.getbootstrap.com/', '_blank');
  };

    return (
        <Box m="20px">
            <Header 
               title={lang === "ar" ? "الخدمات المقدمة  " : "Services Introduced"}
               subtitle={lang === "ar" ?"تعديل ايقونة الخدمات أشاره وشرط من ايقون المقدمه من البوتستراب" : "Modify the services icon, a sign and a condition from the iPhone provided by Bootstrap"}
            />
          <Box display="flex" mb="20px">
  <Button
    type="submit"
    color="secondary"
    variant="contained"
    onClick={handleButtonClick} // Add this line
  >
    {lang === 'ar' ? 'اختر ايقون' : 'Choose icon'}
  </Button>
</Box>
            {/* Alert Snackbar */}
            <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? "العنوان" : "Title"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.title}
                                name="title"
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label={lang === "ar" ? " ايقون" : "Icon"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.icon}
                                name="icon"
                                sx={{ gridColumn: "span 2" }}
                            />
                           
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                {lang === "ar" ? "تعديل" : "EDIT"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}

export default UpdateServicesAbout;
