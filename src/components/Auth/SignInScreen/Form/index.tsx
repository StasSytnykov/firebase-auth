import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import style from './UserForm.module.css';

interface FormModel {
  email: string;
  password: string;
  showPassword: boolean;
}

interface FormUserProps {
  handleLogin: (email: string, password: string) => void;
}

interface State {
  showPassword: boolean;
}

const validateEmail = (value: string) => {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validatePassword = (value: string) => {
  let error;
  if (!value) {
    error = 'Required';
  }
  if (value.length !== 0 && value.length < 6) {
    error = 'Password to short';
  }
  return error;
};

const UserFormLogin: React.FC<FormUserProps> = ({ handleLogin }) => {
  const [value, setValue] = React.useState<State>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Formik<FormModel>
        initialValues={{
          email: '',
          password: '',
          showPassword: false,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, touched, isSubmitting, values }) => {
          const password = values.password.length >= 6;

          return (
            <Form>
              <div className={style.inputThumb}>
                <p className={style.inputText}>Email</p>
                <Field
                  className={style.input}
                  name="email"
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <p className={style.helpfulText}>{errors.email}</p>
                )}
              </div>
              <div className={style.inputThumb}>
                <p className={style.inputText}>Password</p>
                <Field
                  className={style.input}
                  type={value.showPassword ? 'text' : 'password'}
                  name="password"
                  validate={validatePassword}
                />
                <IconButton
                  style={{
                    width: '24px',
                    height: '24px',
                    position: 'absolute',
                    top: '24px',
                    right: '7px',
                  }}
                  size="small"
                  type="button"
                  onClick={handleClickShowPassword}
                >
                  {value.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                {errors.password && touched.password && (
                  <p className={style.helpfulText}>{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!values.email || !password || isSubmitting}
                onClick={() => handleLogin(values.email, values.password)}
              >
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default UserFormLogin;
