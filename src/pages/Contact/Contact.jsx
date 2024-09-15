import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams,useNavigate } from "react-router-dom";

function Contact() {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [contact, setcontact] = useState([]);


  const columns = [
    {
      field: "email",
      headerName: lang === "ar" ? "البريد الإلكتروني" : "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: lang === "ar" ? "الاسم" : "Name",
      flex: 1,
    },
    {
      field: "message",
      headerName: lang === "ar" ? "الرسالة" : "Message",
      flex: 2,
      minWidth: 200, // Ensure the column has a minimum width
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal", // Allow text to wrap
            wordBreak: "break-word", // Break long words if necessary
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "phone",
      headerName: lang === "ar" ? "الهاتف" : "Phone",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
        field: "accessLevel",
        headerName: lang === "ar" ? "حذف" : "Delete",
        renderCell: (params) => {
          const { id } = params.row; // Declare the variable outside of JSX
      
          return (
            <Box m="0 auto" p="5px" display="flex" justifyContent="center">
              <Typography
                color={colors.redAccent[400]}
                sx={{ ml: "5px", cursor: "pointer" }}
              >
                
                <DeleteOutlineIcon onClick={() => handleDelete(id)} />
              </Typography>
            </Box>
          );
        },
      }
      
  ]

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const contactRes = await axios.get(`http://localhost:9090/contactForm`);
        setcontact(contactRes.data);
        console.log(contactRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/contactForm/delete/${id}`);
      // Refresh the data after deletion
      const updatedContacts = contact.filter((item) => item.id !== id);
      setcontact(updatedContacts);
      console.log("deleting contacts");
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };
  



  return (
    <Box m="20px">
    <Header
      title={lang === "ar" ? " تواصل معنا " : "Contact us"}
      subtitle={lang === "ar" ? "قائمه تواصل معنا " : "List of Contact us"}
    />
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },

        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[400],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#365486",
          borderBottom: "none",
          color: "#fafafa",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#365486",
          color: "#fafafa",
        },
        "& .MuiTablePagination-root": {
          color: "#fafafa",
        },
        "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
          {
            color: "#fafafa",
          },
        "& .MuiTablePagination-actions .MuiButtonBase-root": {
          color: "#fafafa",
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      
      <DataGrid
        rows={contact} // Ensure this is an array of objects
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        rowHeight={100} // Set the row height here
      />
    </Box>
  </Box>
);
}


export default Contact