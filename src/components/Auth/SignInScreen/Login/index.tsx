import React, { useState } from 'react';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import UserFormLogin from '../Form';
import SimpleSnackbar from '../Snackbar';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Login = () => {
  const [error, setError] = useState(false);

  const { push } = useHistory();
  const handleClickLogin = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => push('/'))
      .catch(() => setError(true));
    setError(false);
  };

  return (
    <div>
      <UserFormLogin handleLogin={handleClickLogin} />
      {error && <SimpleSnackbar />}
    </div>
  );
};

export default Login;
