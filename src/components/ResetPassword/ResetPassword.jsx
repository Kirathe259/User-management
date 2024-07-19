import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (value) => {

    const regex = /^(?=.\d)(?=.[!@#$%^&])(?!.\s).{5,15}$/;
    if (!regex.test(value)) {
      setError("Password must be between 5 to 15 characters, contain at least one number, one symbol, and no spaces");
    } else {
      setError("");
    }

    setNewPassword(value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const response = await api.put('/resetpassword', {

        email,
        newPassword,
      });

      setSuccessMessage(response.data.message);
      
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error.response.data);
      setError(error.response.data.message || 'An error occurred while resetting password.');
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#169',
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 4,
          borderRadius: 3,
          bgcolor: 'white',
          textAlign: 'center',
          height:'550px'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: '#169',fontWeight:'bold' }}>My Health</Typography>
        <Typography variant="h6" gutterBottom sx={{fontWeight:'bold'}}>_Reset Password</Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="New Password"
            required
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>{error}</Typography>}
          <TextField
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 8, backgroundColor: '#169',width:250}}
          >
            {loading ? 'Resetting...' : 'Reset'}
          </Button>
        </form>
        {successMessage && <Typography variant="body2" sx={{ color: 'green', mt: 2 }}>{successMessage}</Typography>}
      </Box>
    </Box>
  );
}

export default PasswordReset;
