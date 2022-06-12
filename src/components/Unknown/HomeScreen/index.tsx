import { Box, Typography, Button } from '@mui/material';
import firebase from 'firebase/app';
import React from 'react';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const HomeScreen: React.FC = () => {
  const handleClickLogout = () => {
    clearFirestoreCache();
    return firebase.auth().signOut();
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Home page</Typography>
      <Button onClick={handleClickLogout}>Logout</Button>
    </Box>
  );
};

export default HomeScreen;
