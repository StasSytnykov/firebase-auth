import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import app from '../../../../common/firebaseApp';
import UserFormLogin from '../Form';
import SimpleSnackbar from '../Snackbar';
import style from './Login.module.css';

const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const { push } = useHistory();

  const handleClickLogin = (email: string, password: string) => {
    setAuth(true);
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => push('/'))
      .catch(() => {
        setError(true);
      });
    setAuth(false);
    setError(false);
  };

  return (
    <Box className={style.loginThumb}>
      <UserFormLogin handleLogin={handleClickLogin} auth={auth} title="Login" />
      {error && <SimpleSnackbar />}
    </Box>
  );
};

export default Login;
