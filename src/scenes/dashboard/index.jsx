import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import WorkIcon from "@mui/icons-material/Work";
import BookIcon from "@mui/icons-material/Book";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lang } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [blogs, setblogs] = useState([]);
  const [careers, setcareers] = useState([]);
  const [services, setservices] = useState([]);
  const [jobapplication, setjobapplication] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [careersRes, blogsRes, servicesRes, jobapplicationRes] =
          await Promise.all([
            axios.get(`${API_URL}/careers/${lang}`),
            // axios.get(`${API_URL}/imgsliderhome/`),
            axios.get(`${API_URL}/blogs/${lang}`),
            axios.get(`${API_URL}/services/${lang}`),
            axios.get(`${API_URL}/careerform`),
          ]);

        setblogs(careersRes.data);
        setcareers(blogsRes.data);
        setservices(servicesRes.data);
        setjobapplication(jobapplicationRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [lang]);
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={lang === "ar" ? "  لوحة التحكم  " : "DASHBOARD"}
          subtitle={lang === "ar" ? "اهلا بك في لوحة تحكم كاسل" : "Welcome To Kassel Dashboard"}
        />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.lightBlue[900],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={careers.length}
            subtitle={lang === "ar" ? "الوظائف" : "Careers"}
            icon={
              <WorkIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={blogs.length}
            subtitle={lang === "ar" ? "المدونات" : "Blogs"}
            icon={
              <BookIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={services.length}
            subtitle={lang === "ar" ? "الخدمات" : "services"}
            icon={
              <DesignServicesIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={jobapplication.length}
            subtitle={lang === "ar" ? "طلبات التوظيف" : "Job Application"}
            icon={
              <CloudDoneIcon
                sx={{ color: colors.lightBlue[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 3 */}
      </Box>
    </Box>
  );
};

export default Dashboard;
