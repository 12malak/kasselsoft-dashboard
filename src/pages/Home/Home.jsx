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

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [mainHome, setMainHome] = useState([]);

  const columns = [
    { field: "title", headerName: "title", flex: 1 },
    { field: "subtitle", headerName: "subtitle", flex: 1 },
    {
      field: "description",
      headerName: "description",
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
      field: "button",
      headerName: "button",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "accessLevel",
      headerName: "Delete",
      renderCell: ({ row: { access } }) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography color={colors.redAccent[400]} sx={{ ml: "5px" }}>
            <DeleteOutlineIcon />
          </Typography>
        </Box>
      ),
    },
    {
      field: "accessLeve2",
      headerName: "Edit",
      renderCell: ({ row: { access } }) => (
        <Box m="0 auto" p="5px" display="flex" justifyContent="center">
          <Typography
            color={colors.greenAccent[400]}
            sx={{ ml: "5px" }}
            onClick={() => navigate(`/${lang}/updatemainhome`)} // Navigate on click
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
        const mainhomeRes = await axios.get(`${API_URL}/home/${lang}`);
        setMainHome(mainhomeRes.data);
        console.log(mainhomeRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAllData();
  }, [lang]);

  return (
    <Box m="20px">
      <Header
        title="Main Home"
        subtitle="List of Main Home"
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
        {/* <Button
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
        >
          Add
        </Button> */}
        <DataGrid
          rows={mainHome} // Ensure this is an array of objects
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          rowHeight={100} // Set the row height here
        />
      </Box>
    </Box>
  );
}

export default Home;
