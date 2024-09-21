import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useParams, useNavigate } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog.jsx";

function Blogs() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [Blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // 'blog' or 'description'
  const handleClickOpen = (id, type) => {
    setCurrentId(id);
    setDeleteType(type); // Set the type to either 'blog' or 'description'
    setOpen(true);
  };
  const handleUpdate = (id) => {
    navigate(`/${lang}/updateblog`, { state: { id } });
    console.log("first", id);
  };

  const columns = [
    {
      field: "title",
      headerName: lang === "ar" ? "العنوان" : "Title",
      flex: 1,
    },
    {
      field: "main_description",
      headerName: lang === "ar" ? "الوصف" : "	main Description",
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
      field: "tag_name",
      headerName: lang === "ar" ? "التاغ" : "Tag",
      flex: 1,
    },
    {
      field: "description",
      headerName: lang === "ar" ? "الوصف" : "Description",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ maxHeight: 100, overflowY: 'auto' }}> {/* Set maxHeight and overflow */}
          {params.row.descriptions &&
            params.row.descriptions.map((desc) => (
              <Box
                key={desc.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                >
                  {desc.description}
                </Typography>
                <Typography
                  color="red" // Change color as needed
                  sx={{ ml: "5px", cursor: "pointer" }}
                  onClick={() => handleClickOpen(desc.id, 'description')} // Specify type as 'description'
                >
                  <DeleteOutlineIcon />
                </Typography>
              </Box>
            ))}
        </Box>
      ),
    }
,    
    {
      field: "accessLevel",
      headerName: "Delete",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.redAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => {
              handleClickOpen(params.id,"blog");
            }}
          >
            <DeleteOutlineIcon />
          </Typography>
        </Box>
      ),
    },
    {
      field: "accessLeve2",
      headerName: lang === "ar" ? "تعديل" : "Edit",
      renderCell: (params) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.greenAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => handleUpdate(params.id)} // Use the ID here
          >
            <BorderColorIcon />
          </Typography>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const BlogsRes = await axios.get(`${API_URL}/blogs/${lang}`);
        setBlogs(BlogsRes.data);
        console.log(BlogsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);
  const handleDelete = async () => {
    try {
      if (deleteType === 'blog') {
        await axios.delete(`${API_URL}/blogs/delete/${lang}/${currentId}`);
        setBlogs((prevData) => prevData.filter((data) => data.id !== currentId));
      } else if (deleteType === 'description') {
        await axios.delete(`${API_URL}/blogs/deletedescr/${currentId}`);
        // Optionally, update the descriptions in the specific blog
        setBlogs((prevData) => 
          prevData.map((blog) => {
            if (blog.descriptions) {
              return {
                ...blog,
                descriptions: blog.descriptions.filter(desc => desc.id !== currentId)
              };
            }
            return blog;
          })
        );
      }
      handleClose(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
  
  

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box m="20px">
      <Header
        title={lang === "ar" ? "المدونات" : "Blogs "}
        subtitle={lang === "ar" ? "بيانات المدونات" : "List of Blogs"}
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.lightBlue[900], // Background color for the button
            color: "#fafafa",
            borderColor: colors.lightBlue[100], // Border color
            "&:hover": {
              backgroundColor: colors.lightBlue[700], // Background color on hover
              borderColor: colors.lightBlue[600], // Border color on hover
            },
            padding: "10px 45px", // Button padding
            fontSize: "16px", // Font size
            fontWeight: "bold", // Font weight
          }}
          onClick={() => {
            navigate(`/${lang}/addblog`);
          }}
        >
          {lang === "ar" ? "اضافة" : "Add"}
        </Button>
        <DataGrid
          rows={Blogs} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>
      <DeleteDialog
        open={open}
        onClose={handleClose}
        handleDelete={handleDelete}
        
      />
    </Box>
  );
}

export default Blogs;
