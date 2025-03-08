import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Modal,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Folder,
  Message,
  Notifications,
  LocationOn,
  ShowChart,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sample data for charts
const data = [
  { name: "Jan", uv: 3000, pv: 2400 },
  { name: "Feb", uv: 5000, pv: 3200 },
  { name: "Mar", uv: 3500, pv: 2800 },
  { name: "Apr", uv: 6000, pv: 3900 },
  { name: "May", uv: 5000, pv: 4600 },
  { name: "Jun", uv: 7000, pv: 5100 },
  { name: "Jul", uv: 8000, pv: 5400 },
];

const pieData = [
  { name: "Progress", value: 45 },
  { name: "Remaining", value: 55 },
];

const COLORS = ["#FFBB28", "#EEEEEE"];

const Dashboard = () => {
  const { user, logout, updateProfilePicture } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePicture", file);
  
    try {
      await updateProfilePicture(formData);
      handleClose();
    } catch (err) {
      console.error("Error updating profile picture:", err);
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f4f6f8">
      {/* Sidebar */}
      <Box
        width={280}
        bgcolor="#2c3e50"
        color="white"
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar
          sx={{ width: 80, height: 80, mb: 2, cursor: "pointer" }}
          src={`http://localhost:5000${user?.profilePicture}`}
          onClick={handleOpen}
        />
        <Typography variant="h6">{user?.name}</Typography>
        <Typography variant="body2">{user?.email}</Typography>
        <List sx={{ width: "100%", mt: 3 }}>
          {[
            { icon: <Home sx={{ color: "white" }} />, text: "Home" },
            { icon: <Folder sx={{ color: "white" }} />, text: "File" },
            { icon: <Message sx={{ color: "white" }} />, text: "Messages" },
            {
              icon: <Notifications sx={{ color: "white" }} />,
              text: "Notification",
            },
            { icon: <LocationOn sx={{ color: "white" }} />, text: "Location" },
            { icon: <ShowChart sx={{ color: "white" }} />, text: "Graph" },
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleLogout}
          color="inherit"
          variant="outlined"
          sx={{ mt: "auto", color: "white", borderColor: "white" }}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={4}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Dashboard User
        </Typography>

        {/* Metric Cards */}
        <Grid container spacing={3}>
          {["Earnings", "Shares", "Likes", "Rating"].map((title, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", p: 2, backgroundColor: "#ffffff" }}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    {title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" mt={1}>
                    {["$628", "2434", "1259", "8.5"][index]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Additional Content */}
        <Grid container spacing={3} mt={2}>
          {/* Bar Chart */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Result
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uv" fill="#ff9800" />
                    <Bar dataKey="pv" fill="#1a237e" />
                  </BarChart>
                </ResponsiveContainer>
                <Box display="flex" alignItems="center" mt={2}>
                  <Box
                    sx={{ width: 16, height: 16, backgroundColor: "#ff9800" }}
                  />
                  <Typography variant="body2" sx={{ ml: 1, mr: 2 }}>
                    2019
                  </Typography>
                  <Box
                    sx={{ width: 16, height: 16, backgroundColor: "#1a237e" }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    2020
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    sx={{ ml: "auto" }}
                  >
                    Check Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Progress
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Stack spacing={1} mt={2}>
                  {pieData.map((entry, index) => (
                    <Typography variant="body2" key={index}>
                      {entry.name}: {entry.value}%
                    </Typography>
                  ))}
                </Stack>
                <Button variant="contained" color="warning" sx={{ mt: 2 }}>
                  Check Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Modal for Image Upload */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload Profile Picture
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginBottom: 16 }}
          />
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;