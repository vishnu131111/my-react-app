import React from "react";
import { Card, CardContent, Typography, Button, Container, Paper, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudentDashboard = ({ student }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  // Mock seating arrangement (2 students per desk, 3 rows)
  const seatingArrangement = [
    [{ name: "Elton", seat: "A1" }, { name: ".", seat: "A2" }],
    [{ name: ".", seat: "B1" }, { name: ".", seat: "B2" }],
    [{ name: ".", seat: "C1" }, { name: ".", seat: "C2" }],
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#d0e7ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            color: "#004085",
          }}
        >
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#007BFF" }}>
            🎓 Student Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Student Info Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "#E3F2FD",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  color: "#004085",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Student Information
                  </Typography>
                  <Typography><strong>Name:</strong> {student?.name}</Typography>
                  <Typography><strong>Class:</strong> {student?.class}</Typography>
                  <Typography><strong>Department:</strong> {student?.department}</Typography>
                  <Typography><strong>Reg. No:</strong> {student?.registrationNumber}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Exam Details Card */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "#E3F2FD",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  color: "#004085",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    Exam Details
                  </Typography>
                  <Typography><strong>Seat No:</strong> {student?.seatNumber}</Typography>
                  <Typography><strong>Exam Subject:</strong> {student?.examSubject}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Seating Arrangement */}
          <Typography variant="h5" fontWeight="bold" mt={4} mb={2} align="center">
            🪑 Seating Arrangement
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {seatingArrangement.map((row, rowIndex) => (
              <Grid container item spacing={2} key={rowIndex} justifyContent="center">
                {row.map((student, studentIndex) => (
                  <Grid item key={studentIndex}>
                    <Card
                      sx={{
                        background: "#D6EAF8",
                        borderRadius: 2,
                        padding: 2,
                        textAlign: "center",
                        minWidth: 120,
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {student.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Seat {student.seat}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>

          {/* Logout Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1rem",
              background: "#007BFF",
              color: "white",
              fontWeight: "bold",
              "&:hover": { background: "#0056b3" },
            }}
            onClick={handleLogout}
          >
            Logout 
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
