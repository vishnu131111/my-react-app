import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  // Hardcoded faculty details
  const facultyDetails = {
    name: "Prof. Febin",
  };

  // Exam schedule for six days with different classes
  const examSchedule = [
    { day: "Monday", time: "10:00 AM - 12:30 PM", class: "Computer Science - Batch A" },
    { day: "Tuesday", time: "10:00 AM - 12:30 PM", class: "Information Technology - Batch B" },
    { day: "Wednesday", time: "10:00 AM - 12:30 PM", class: "Electronics & Communication - Batch C" },
    { day: "Thursday", time: "10:00 AM - 12:30 PM", class: "Mechanical Engineering - Batch D" },
    { day: "Friday", time: "10:00 AM - 12:30 PM", class: "Civil Engineering - Batch E" },
    { day: "Saturday", time: "10:00 AM - 12:30 PM", class: "Electrical Engineering - Batch F" },
  ];

  // Logout function
  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {/* Faculty Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%", textAlign: "center", p: 3, bgcolor: "#b3d6f9", color: "black" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Faculty Dashboard
              </Typography>
              <Typography variant="h6">{facultyDetails.name}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Exam Schedule Table */}
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table stickyHeader>
              <TableHead sx={{ bgcolor: "#b3d6f9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", bgcolor: "#b3d6f9", color: "black" }}>Day</TableCell>
                  <TableCell sx={{ fontWeight: "bold", bgcolor: "#b3d6f9", color: "black" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold", bgcolor: "#b3d6f9", color: "black" }}>Class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examSchedule.map((exam, index) => (
                  <TableRow key={index}>
                    <TableCell>{exam.day}</TableCell>
                    <TableCell>{exam.time}</TableCell>
                    <TableCell>{exam.class}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" sx={{ mt: 3, width: "200px", bgcolor: "#1976D2", "&:hover": { bgcolor: "#1565C0" } }} onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FacultyDashboard;
