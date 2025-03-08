import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  width: 400,
  padding: 30,
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
  borderRadius: 12,
  textAlign: 'center',
});

const StyledButton = styled(Button)({
  marginTop: 20,
  padding: '10px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: 8,
  textTransform: 'none',
});

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ backgroundColor: '#f4f6f8' }}
    >
      <StyledCard>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Sign up to get started
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <StyledButton fullWidth variant="contained" color="primary" type="submit">
              Sign Up
            </StyledButton>
          </form>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
              Login
            </Button>
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Signup;
