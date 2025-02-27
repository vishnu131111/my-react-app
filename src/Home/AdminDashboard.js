import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid, Paper, Box } from "@mui/material";

// Mock data for students
const mockStudents = [
  { rollNumber: "CS001", name: "elton", department: "CS" },
  { rollNumber: "ME001", name: "arjun", department: "mech" },
  { rollNumber: "ME002", name: "edgar", department: "CS" },
  { rollNumber: "ME002", name: "febin", department: "mech" },
  { rollNumber: "CS003", name: "hormise", department: "cs" },
  { rollNumber: "CS003", name: "ashwin", department: "cs" },
  { rollNumber: "ME004", name: "anwin", department: "MECH" },
];

export const AdminDashboard = () => {
  const [timetable, setTimetable] = useState([]);
  const [seatingAllocation, setSeatingAllocation] = useState([]);
  const navigate = useNavigate();

  // Function to auto-generate timetable
  const generateTimetable = () => {
    const newTimetable = [
      { subject: "electronics", date: "2025-03-01" },
      { subject: "computer science", date: "2025-03-03" },
      { subject: "graphics", date: "2025-03-05" },
      { subject: "civil", date: "2025-03-05" },
    ];
    setTimetable(newTimetable);
  };

  // Function to allocate seating
  const allocateSeating = () => {
    const rows = [];
    const studentsCopy = [...mockStudents];
    while (studentsCopy.length > 0) {
      const row = [];
      const student1 = studentsCopy.shift();
      row.push(student1);
      const student2 = studentsCopy.find((s) => s.department !== student1.department);
      if (student2) {
        studentsCopy.splice(studentsCopy.indexOf(student2), 1);
        row.push(student2);
      }
      rows.push(row);
    }
    setSeatingAllocation(rows);
  };

  // Logout function
  const handleLogout = () => {
    navigate("/"); // Redirects to login page
  };

  useEffect(() => {
    generateTimetable();
    allocateSeating();
  }, []);

  return (
    <Box style={{ padding: "24px", height: "100vh" }}>
      <Paper elevation={3} style={{ padding: "24px", borderRadius: "16px" }}>
        {/* Header Section with Logout Button */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Admin Dashboard
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* Buttons */}
        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" color="primary" onClick={generateTimetable}>
            Generate Timetable
          </Button>
          <Button variant="contained" color="secondary" onClick={allocateSeating}>
            Allocate Seating
          </Button>
        </Box>

        {/* Timetable Section */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Timetable
        </Typography>
        <Grid container spacing={3}>
          {timetable.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">
                    Subject: {item.subject}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {item.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Seating Allocation Section */}
        <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
          Seating Allocation
        </Typography>
        <Grid container spacing={3}>
          {seatingAllocation.map((row, index) => (
            <Grid item xs={12} key={index}>
              <Card style={{ borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Row {index + 1}
                  </Typography>
                  {row.map((student, i) => (
                    <Typography key={i} variant="body2" color="textSecondary">
                      {student.name} ({student.rollNumber}) - {student.department}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
