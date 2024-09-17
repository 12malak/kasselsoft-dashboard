import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

const AddImgSliderHome = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [img, setImg] = useState(null);
  const [cardhomeId, setcardhomeId] = useState("");
  const [cardhome, setcardhome] = useState({});
  const [imgslider,setImgslider]=useState([])
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  // Fetch data when cardhomeId changes
  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async () => {

        if (!img) {
            setAlert({ open: true, message: lang === 'ar' ? "الرجاء اضافة صورة":"Please Add img !", severity: "error" });

        }
        try {
          const formData = new FormData();
          formData.append('slider', img);
        //   formData.append('author', author);
        //   formData.append('department_id', department_id);
        //   formData.append('page_num', page_num);
        //   formData.append('file_book', selectedFile);
        //   const maxSize = 100 * 1024 * 1024; // 100 MB
        //   if (selectedFile.size > maxSize) {
        //     Toastify({
        //       text: "File size exceeds 100 MB",
        //       duration: 3000,
        //       gravity: "top",
        //       position: 'right',
        //       backgroundColor: "#CA1616",
        //     }).showToast();
        //     return;
        //   }
          const response = await axios.post(
            `${API_URL}/imgsliderhome/add`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
          setImgslider(response.data);
        //   Toastify({
        //     text: "Added completely",
        //     duration: 3000, // Duration in milliseconds
        //     gravity: "top", // 'top' or 'bottom'
        //     position: 'right', // 'left', 'center', 'right'
        //     backgroundColor: "#833988",
        //   }).showToast();
        setAlert({ open: true, message: lang === 'ar' ? "تمت الاضافة بنجاح":"Added successful!", severity: "success" });

        setTimeout(() => {
            navigate(`/${lang}/whychooseus`);
          }, 2000);    
        } catch (error) {
          console.log(`Error fetching post data ${error}`);
        }
  };

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <Box m="20px">
      <Header title={lang ==="ar" ? " اضافة صور" :"Add img slider"} subtitle={lang === 'ar' ? "اضافة صور" :"Add List of img slider" }/>

      {alert.open && (
        <Alert
          severity={alert.severity}
          sx={{
            backgroundColor: alert.severity === "success" ? "#365486" : "#f8d7da",
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
  enableReinitialize={true} // Important to reinitialize when cardhome changes
  onSubmit={handleFormSubmit}
  initialValues={{}} // Define initial values if necessary
>
  {({
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
          sx={{ gridColumn: "span 4" }}
          label={lang ==="ar" ? "الصورة": "Img"}
          variant="outlined"
          type="file"
          onChange={handleImg}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          { lang ==="ar" ? "اضافة" :" Add "}
        </Button>
      </Box>
    </form>
  )}
</Formik>

    </Box>
  );
};

// const checkoutSchema = yup.object().shape({
//   title: yup.string().required("Title is required"),
//   description: yup.string().required("Description is required"),
// });

export default AddImgSliderHome;
