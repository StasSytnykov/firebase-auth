import { Box, Typography } from '@mui/material';
import React from 'react';
import ResponsiveAppBar from './AppBar/AppBar';

const HomeScreen: React.FC = () => {
  return (
    <Box>
      <ResponsiveAppBar />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h1"> </Typography>
      </Box>
    </Box>
  );
};

export default HomeScreen;
