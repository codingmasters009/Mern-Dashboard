import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Please log in to continue
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
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
              Login
            </StyledButton>
          </form>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Button onClick={() => navigate('/signup')} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
              Sign Up
            </Button>
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default Login;
