import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import { AdminDashboard } from "./Home/AdminDashboard";
import { LoginPage } from "./LoginPage/LoginPage";
import StudentDashboard from "./Home/StudentDashboard";
import FacultyDashboard from "./Home/FacultyDashboard";

const drawerWidth = 240;

const studentData = {
  name: "Elton",
  class: "S6 civil A Block",
  department: "Computer Science",
  registrationNumber: "AIK22CS027",
  seatNumber: "A21",
  examSubject: "Graphics",
};

const Sidebar = () => {
  const location = useLocation();
  const isAdminDashboard = (location.pathname === "/admin-dashboard" || location.pathname === "/allocate-seating" || location.pathname === "/allocate-seating");
console.log(location.pathname,"location.pathname")
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1202,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#009ceb",
        },
      }}
    >
      <List>
        <Box sx={{ px: 2, pt: 1.5, pb: 2 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#FFF" }}>
            Exam Management
          </Typography>
        </Box>
        <ListItem
          button
          component="a"
          href="/admin-dashboard"
          sx={{ color: "#FFF" }}
        >
          <ListItemText primary="Admin Dashboard" />
        </ListItem>
        {isAdminDashboard ? (
          <>
            <ListItem
              button
              component="a"
              href="/generate-timetable"
              sx={{ color: "#FFF" }}
            >
              <ListItemText primary="Generate Timetable" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/allocate-seating"
              sx={{ color: "#FFF" }}
            >
              <ListItemText primary="Allocate Seating" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              button
              component="a"
              href="/student-dashboard"
              sx={{ color: "#FFF" }}
            >
              <ListItemText primary="Student Dashboard" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="/faculty-dashboard"
              sx={{ color: "#FFF" }}
            >
              <ListItemText primary="Faculty Dashboard" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#FFF" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h6" color="primary" noWrap>
          Exam Management
        </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!isLoginPage && <Navbar />}
      {!isLoginPage && <Sidebar />}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: !isLoginPage ? "84px" : "0px" }}
      >
        {children}
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/generate-timetable"
            element={<div>Generate Timetable Page</div>}
          />
          <Route
            path="/allocate-seating"
            element={<div>Allocate Seating Page</div>}
          />
          <Route
            path="/student-dashboard"
            element={<StudentDashboard student={studentData} />}
          />
          <Route
            path="/faculty-dashboard"
            element={<FacultyDashboard student={studentData} />}
          />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
