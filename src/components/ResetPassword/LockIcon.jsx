import { Box, LockIcon } from '@mui/material'; 

const styles = {
  container: {
    height: '30px',
    width: '30px', 
    borderRadius: '50%',
    margin: '0 auto 20px', 
    border: 'solid 2px maroon',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: '20px', 
    color: 'primary', 
  },
};

const LockIconBox = () => {
  return (
    <Box sx={styles.container}>
      <LockIcon sx={styles.icon} alt="Reset Password" />
    </Box>
  );
};

export default LockIconBox;
