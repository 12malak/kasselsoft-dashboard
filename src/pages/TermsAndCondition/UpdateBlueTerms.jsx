import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

const UpdateBlueTerms = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [bluetermsId, setbluetermsId] = useState("");
  const [blueterms, setblueterms] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch data when bluetermsId changes
  useEffect(() => {
    if (bluetermsId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/termsandconditions/data/blue/getbyid/${bluetermsId}`
          );
          setblueterms(response.data[0]);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [bluetermsId]);

  // Set bluetermsId from location state
  useEffect(() => {
    if (location.state && location.state.id) {
      setbluetermsId(location.state.id);
    } else {
      console.warn("No ID found in location.state");
    }
  }, [location.state]);

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `${API_URL}/termsandconditions/blue/update/${lang}/${bluetermsId}`,
        {
          title: values.title,
          description: values.description,
          page_type: values.page_type,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure the correct content type
          },
        }
      );  
      setAlert({
        open: true,
        message: lang === "ar" ? "تم التعديل بنجاح" : "Update successful!",
        severity: "success",
      });
  
      setTimeout(() => {
        navigate(`/${lang}/termsandcondition`);
      }, 2000);
    } catch (error) {
      console.error(`Error in fetch edit data: ${error.response?.data || error.message}`);
      setAlert({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error",
      });
    }
  };
  

  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "تعديل شروط" : "UPDATE Blue Terms "}
        subtitle={
          lang === "ar" ? "تعديل بيانات الشروط" : "Update an Blue Terms"
        }
      />

      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{
            backgroundColor:
              alert.severity === "success" ? "#365486" : "#f8d7da",
            marginBottom: "2vh",
            color: alert.severity === "success" ? "#fff" : "#721c24",
            "& .MuiAlert-icon": {
              color: alert.severity === "success" ? "#fff" : "#721c24",
            },
            "& .MuiAlert-message": {
              fontWeight: "bold",
            },
          }}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      )}

      <Formik
        enableReinitialize={true} // Important to reinitialize when blueterms changes
        initialValues={{
          title: blueterms.title || "",
          description: blueterms.description || "",
          page_type: blueterms.page_type || "",
        }}
        onSubmit={handleFormSubmit}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
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
                value={values.title} // Correct usage of Formik values
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />


              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "اسم الصفحة" : "page_type"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.page_type} // Correct usage of Formik values
                name="page_type"
                error={!!touched.page_type && !!errors.page_type}
                helperText={touched.page_type && errors.page_type}
                sx={{ gridColumn: "span 2" }}
                disabled
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label={lang === "ar" ? "الوصف" : "Description"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description} // Correct usage of Formik values
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
                multiline
                rows={6}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {lang === "ar" ? "تعديل" : " Update "}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  page_type: yup.string().required("page_type is required"),
});

export default UpdateBlueTerms;
