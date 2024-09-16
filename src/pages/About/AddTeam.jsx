import React, { useState } from "react";
import { Box, Button, TextField, Alert, Stack,Snackbar } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function AddTeam() {
    const navigate = useNavigate();
  const { lang } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State for showing success/error messages
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  // Handle form submission
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `http://localhost:9090/abuteteam/addteam/${lang}`,
        values
      );
      console.log(response.data);
      
      setAlert({ open: true, message: lang === 'ar' ? "تم الاضافه بنجاح" : "Contact information added successfully!", severity: "success" });
        // Delay navigation after success
        setTimeout(() => {
            navigate(`/${lang}/teamAbout`);
        }, 2000);
      resetForm(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Error adding contact information:", error);
      setAlert({
        type: "error",
        message: "Failed to add contact information. Please try again.",
        visible: true,
      });
    } finally {
      setSubmitting(false); // Set submitting to false once request is complete
    }
  };

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "  نحن" : "ABOUT US"}
        subtitle={
          lang === "ar" ?"اضافه عضو للفريق" : "Create a New Team Member"
        }
      />

       {/* Alert Snackbar */}
       <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
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
                label={lang === "ar" ? "الاسم" : "Name"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? " المشاريع" : "Projects"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projects}
                name="projects"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "التخصص" : "Major"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.major}
                name="major"
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting} // Disable button while submitting
              >
                {lang === "ar" ? "إضافه جديده" : "ADD"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

const initialValues = {
    name: "",
  projects: "",
  major: "",
};

export default AddTeam;