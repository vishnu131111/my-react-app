import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Grid } from "@mui/material";

// Subjects for CS & ECE Semester 6 (KTU)
const csSubjects = ["Machine Learning", "Compiler Design", "Cloud Computing", "Artificial Intelligence", "Cyber Security"];
const eceSubjects = ["Embedded Systems", "VLSI Design", "Digital Signal Processing", "Communication Networks", "Wireless Systems"];

// Faculty list
const facultyList = Array.from({ length: 50 }, (_, i) => `Faculty ${i + 1}`);

// Function to shuffle an array
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Function to generate a random timetable without repeating subjects
const generateRandomTimetable = (subjects, usedSubjects) => {
  let remainingSubjects = subjects.filter(subject => !usedSubjects.includes(subject));
  if (remainingSubjects.length === 0) remainingSubjects = [...subjects]; // Reset if all subjects are used
  usedSubjects.length = 0; // Clear previous subjects
  shuffleArray(remainingSubjects);
  usedSubjects.push(...remainingSubjects);
  return remainingSubjects.map((subject, index) => ({
    subject,
    date: `2025-03-${(index + 1) * 2}` // Randomized date pattern
  }));
};

// Function to generate random students
const generateRandomStudents = (department) => {
  const names = ["Elton", "Arjun", "Edgar", "Febin", "Hormise", "Ashwin", "Anwin", "Rajesh", "Vikram", "Sanjay"];
  return shuffleArray(Array.from({ length: 10 }, (_, i) => ({
    rollNumber: `${department}${i + 1}`,
    name: names[i % names.length],
    department
  })));
};

// Function to allocate seating, ensuring same students don’t sit together
const allocateSeating = (students, previousSeating) => {
  let shuffledStudents;
  do {
    shuffledStudents = shuffleArray([...students]);
  } while (previousSeating.some(row => row.every(student => shuffledStudents.includes(student))));

  const seating = [];
  for (let i = 0; i < shuffledStudents.length; i += 2) {
    seating.push([shuffledStudents[i], shuffledStudents[i + 1] || {}]); // Pair students
  }
  return seating;
};

// Function to assign faculty to different rooms, ensuring they don’t get the same room again
const assignFacultyToRooms = (faculty, previousAssignments) => {
  let shuffledFaculty;
  do {
    shuffledFaculty = shuffleArray([...faculty]);
  } while (shuffledFaculty.some((faculty, index) => faculty === previousAssignments[index]));

  return shuffledFaculty.map((faculty, index) => ({
    faculty,
    room: `Room ${index + 1}`
  }));
};

export const AdminDashboard = () => {
  const [usedCsSubjects, setUsedCsSubjects] = useState([]);
  const [usedEceSubjects, setUsedEceSubjects] = useState([]);
  const [csTimetable, setCsTimetable] = useState(generateRandomTimetable(csSubjects, usedCsSubjects));
  const [eceTimetable, setEceTimetable] = useState(generateRandomTimetable(eceSubjects, usedEceSubjects));
  const [csStudents, setCsStudents] = useState(generateRandomStudents("CS"));
  const [eceStudents, setEceStudents] = useState(generateRandomStudents("ECE"));
  const [previousCsSeating, setPreviousCsSeating] = useState([]);
  const [previousEceSeating, setPreviousEceSeating] = useState([]);
  const [csSeating, setCsSeating] = useState(allocateSeating(csStudents, previousCsSeating));
  const [eceSeating, setEceSeating] = useState(allocateSeating(eceStudents, previousEceSeating));
  const [previousFacultyAssignments, setPreviousFacultyAssignments] = useState([]);
  const [facultyAssignments, setFacultyAssignments] = useState(assignFacultyToRooms(facultyList, previousFacultyAssignments));
  const navigate = useNavigate();

  // Generate new random timetable and seating allocation
  const regenerateTimetableAndSeating = () => {
    setCsTimetable(generateRandomTimetable(csSubjects, usedCsSubjects));
    setEceTimetable(generateRandomTimetable(eceSubjects, usedEceSubjects));
    setCsStudents(generateRandomStudents("CS"));
    setEceStudents(generateRandomStudents("ECE"));
    setPreviousCsSeating(csSeating);
    setPreviousEceSeating(eceSeating);
    setCsSeating(allocateSeating(csStudents, previousCsSeating));
    setEceSeating(allocateSeating(eceStudents, previousEceSeating));
  };

  // Assign faculty to different rooms
  const regenerateFacultyAssignments = () => {
    setPreviousFacultyAssignments(facultyAssignments.map(assign => assign.faculty));
    setFacultyAssignments(assignFacultyToRooms(facultyList, previousFacultyAssignments));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f4f4f4", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>

        {/* Timetable Section */}
        <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
          📅 Timetable (CS Semester 6)
        </Typography>
        <Grid container spacing={3}>
          {csTimetable.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">{item.subject}</Typography>
                  <Typography variant="body2">Date: {item.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
          📅 Timetable (ECE Semester 6)
        </Typography>
        <Grid container spacing={3}>
          {eceTimetable.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">{item.subject}</Typography>
                  <Typography variant="body2">Date: {item.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Faculty Assignment */}
        <Typography variant="h5" fontWeight="bold" mt={4} gutterBottom>
          🎓 Faculty Exam Duty Allocation
        </Typography>
        <Grid container spacing={3}>
          {facultyAssignments.map((assign, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" fontWeight="bold">{assign.faculty}</Typography>
                  <Typography variant="body2">Assigned to: {assign.room}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Buttons */}
        <Button onClick={regenerateTimetableAndSeating}>Generate Timetable & Seating</Button>
        <Button onClick={regenerateFacultyAssignments}>Assign Faculty for Exam Duty</Button>

      </Box>
    </Box>
  );
};

export default AdminDashboard;
