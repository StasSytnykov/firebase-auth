import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BootstrapButton from '../../../Unknown/Button/Button';
import style from './UserForm.module.css';

interface FormModel {
  email: string;
  password: string;
  showPassword: boolean;
}

interface FormUserProps {
  auth: boolean;
  handleLogin: (email: string, password: string) => void;
  title: string;
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

const UserFormLogin: React.FC<FormUserProps> = ({
  handleLogin,
  auth,
  title,
}) => {
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
      // height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <svg
        className={style.logo}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="32"
        viewBox="0 0 150 32"
      >
        <path
          fill="#f50057"
          d="M59.939 25.7l-5.502-13.501h3.625l3.236 9.239 3.269-9.239h3.56l-5.502 13.501h-2.686zM75.604 25.993c0.923 0.010 1.838-0.17 2.69-0.527s1.622-0.886 2.264-1.552c0.642-0.667 1.142-1.458 1.47-2.325s0.476-1.793 0.437-2.72c0-3.806-2.719-6.994-6.861-6.994-0.917-0.023-1.829 0.143-2.68 0.487s-1.623 0.86-2.268 1.515c-0.646 0.655-1.151 1.436-1.486 2.294s-0.491 1.777-0.46 2.698c-0.044 0.932 0.102 1.864 0.43 2.737s0.83 1.67 1.476 2.341c0.646 0.671 1.422 1.201 2.28 1.559s1.779 0.535 2.708 0.52v-0.033zM75.604 23.13c-2.492 0-3.495-1.984-3.495-4.229 0-2.212 1.003-4.131 3.495-4.131 2.46 0 3.463 1.952 3.463 4.131 0 2.245-0.971 4.229-3.463 4.229zM90.038 30.157h-3.624l1.941-4.815-5.243-13.143h3.624l3.366 9.369 3.463-9.369h3.593l-7.12 17.957zM102.401 30.157v-5.791c0.971 1.139 2.428 1.627 3.851 1.627 3.689 0 5.761-3.318 5.761-7.059s-2.071-7.027-5.826-7.027c-1.456 0-2.848 0.488-3.786 1.627v-1.334h-3.333v17.957h3.333zM105.379 22.935c-2.266 0-3.269-1.724-3.269-4.001s1.003-4.066 3.236-4.066c2.266 0 3.301 1.789 3.301 4.066s-1.003 4.001-3.268 4.001zM120.427 25.993c0.926 0.014 1.845-0.162 2.7-0.517s1.63-0.883 2.275-1.55c0.646-0.667 1.149-1.46 1.479-2.329s0.479-1.798 0.439-2.727c0-3.806-2.751-6.994-6.894-6.994-0.917-0.023-1.828 0.143-2.679 0.487s-1.623 0.86-2.269 1.515c-0.645 0.655-1.151 1.436-1.485 2.294s-0.491 1.777-0.46 2.698c-0.045 0.932 0.102 1.864 0.43 2.737s0.829 1.67 1.475 2.341c0.646 0.671 1.422 1.201 2.28 1.559s1.78 0.535 2.708 0.52v-0.033zM120.427 23.13c-2.492 0-3.463-1.984-3.463-4.229 0-2.212 0.971-4.131 3.463-4.131s3.463 1.952 3.463 4.131c0 2.245-0.97 4.229-3.463 4.229zM134.020 25.993h0.032c-2.848 0-4.983-1.724-5.631-3.806l2.589-1.171c0.356 0.976 1.068 2.245 2.88 2.245 1.521 0 2.169-0.911 2.169-1.627 0-2.277-6.764-0.748-6.764-5.498 0-2.863 2.395-4.229 4.983-4.229 2.331 0 4.111 1.106 5.114 2.928l-2.525 1.399c-0.485-0.846-1.23-1.724-2.686-1.724-1.068 0-1.715 0.521-1.715 1.171 0 2.049 6.829 0.813 6.829 5.758 0 3.156-2.686 4.554-5.276 4.554zM146.999 25.993c-2.654 0-4.208-1.561-4.208-4.034v-7.027h-2.168v-2.733h2.2v-4.392h3.204v4.424h3.398v2.733h-3.398v6.409c0 1.301 0.68 1.692 1.521 1.692 0.68 0 1.424-0.26 1.877-0.488v2.993c-0.485 0.195-1.488 0.423-2.427 0.423zM2.364 12.232c-0.518 0-0.874 0-1.165 0.716-0.78 1.857-1.188 3.85-1.199 5.866s0.374 4.013 1.134 5.878c0.324 0.781 0.647 0.813 1.23 0.813h6.473c0.257 0 0.504-0.103 0.687-0.286s0.284-0.431 0.284-0.69v-0.325c0-0.259-0.102-0.507-0.284-0.69s-0.429-0.286-0.687-0.286h-3.333c-0.259 0-0.583-0.228-0.583-0.716 0-0.423 0.356-0.651 0.583-0.651h5.308c0.257 0 0.504-0.103 0.687-0.286s0.284-0.431 0.284-0.69v-0.358c0-0.259-0.102-0.507-0.284-0.69s-0.429-0.286-0.687-0.286h-5.308c-0.259 0-0.583-0.228-0.583-0.683 0-0.423 0.356-0.651 0.583-0.651h6.020c0.258 0 0.504-0.103 0.687-0.286s0.284-0.431 0.284-0.69v-0.39c0-0.259-0.102-0.507-0.284-0.69s-0.429-0.286-0.687-0.286h-6.020c-0.259 0-0.583-0.195-0.583-0.651s0.356-0.651 0.583-0.651h4.207c0.257 0 0.504-0.103 0.687-0.286s0.284-0.431 0.284-0.69v-0.39c0-0.259-0.102-0.507-0.284-0.69s-0.429-0.286-0.687-0.286h-7.347zM39.324 26.871l-0.032-0.033h-2.168c-1.262 0-2.298-1.008-2.298-2.277v-0.39c0.002-0.338 0.080-0.672 0.227-0.976-1.197-0.033-2.168-1.074-2.168-2.31v-0.358c-0.012-0.474 0.124-0.941 0.388-1.334-0.647-0.39-1.1-1.106-1.1-1.952v-0.39c0.003-0.559 0.209-1.099 0.578-1.518s0.877-0.689 1.429-0.76c-0.14-0.317-0.207-0.662-0.194-1.009v-0.358c0-1.269 1.003-2.277 2.266-2.277h3.075v-3.481c0-0.488-0.388-0.878-0.874-0.878h-30.94c-0.485 0-0.874 0.39-0.874 0.878v3.481h3.010c1.23 0 2.265 1.009 2.265 2.31v0.325c0 0.39-0.065 0.716-0.227 1.041 1.133 0.098 2.039 1.106 2.039 2.277v0.358c0 0.846-0.485 1.561-1.133 1.984 0.276 0.389 0.423 0.856 0.421 1.334v0.325c0.009 0.602-0.216 1.183-0.627 1.62s-0.976 0.696-1.574 0.722c0.147 0.304 0.224 0.638 0.226 0.976v0.358c0 1.269-1.003 2.31-2.298 2.31h-2.104v4.229c0.008 0.227 0.104 0.442 0.267 0.6s0.38 0.246 0.607 0.246h30.94c0.485 0 0.874-0.39 0.874-0.846v-4.229zM31.88 24.301c-1.125 1.237-2.495 2.223-4.023 2.896s-3.178 1.016-4.845 1.008c-1.67-0.004-3.322-0.352-4.853-1.024s-2.908-1.652-4.047-2.88c-0.68-0.781 0.194-1.854 1.133-1.139 2.168 1.627 4.855 2.537 7.767 2.537 2.771 0.038 5.478-0.842 7.703-2.505 0.874-0.651 1.845 0.325 1.133 1.106h0.032zM23.562 0.163v4.88c0 0.098 0.065 0.163 0.162 0.163h14.143c1.036 0 0.841-0.813 0.518-1.074l-3.884-3.578c-0.356-0.39-0.712-0.553-1.618-0.553h-9.127c-0.097 0-0.162 0.065-0.162 0.163h-0.032zM22.3 5.042v-4.88c0-0.098-0.065-0.163-0.162-0.163h-9.062c-0.906 0-1.295 0.195-1.651 0.553l-3.884 3.578c-0.324 0.293-0.485 1.074 0.55 1.074h14.046c0.097 0 0.162-0.065 0.162-0.163zM43.401 12.232h-7.217c-0.257 0-0.504 0.103-0.687 0.286s-0.284 0.431-0.284 0.69v0.39c0 0.259 0.102 0.507 0.284 0.69s0.429 0.286 0.687 0.286h4.207c0.227 0 0.55 0.195 0.55 0.651s-0.324 0.651-0.55 0.651h-6.020c-0.258 0-0.504 0.103-0.687 0.286s-0.284 0.431-0.284 0.69v0.39c0 0.259 0.102 0.507 0.284 0.69s0.429 0.286 0.687 0.286h6.020c0.227 0 0.55 0.228 0.55 0.651 0 0.455-0.324 0.683-0.55 0.683h-5.308c-0.257 0-0.504 0.103-0.687 0.286s-0.284 0.431-0.284 0.69v0.358c0 0.259 0.102 0.507 0.284 0.69s0.429 0.286 0.687 0.286h5.308c0.227 0 0.55 0.228 0.55 0.651 0 0.488-0.324 0.716-0.55 0.716h-3.333c-0.258 0-0.504 0.103-0.687 0.286s-0.284 0.431-0.284 0.69v0.325c0 0.259 0.102 0.507 0.284 0.69s0.429 0.286 0.687 0.286h6.343c0.712 0 1.003 0 1.359-0.911 1.493-3.692 1.493-7.824 0-11.516-0.356-0.846-0.712-0.846-1.359-0.846z"
        />
      </svg>
      <Typography
        style={{
          fontSize: '40px',
          fontWeight: 'bold',
          letterSpacing: '-1.5px',
          lineHeight: '2.8',
          marginBottom: '61px',
        }}
        variant="h1"
      >
        {title}
      </Typography>
      <Formik<FormModel>
        initialValues={{
          email: '',
          password: '',
          showPassword: false,
        }}
        onSubmit={(values) => handleLogin(values.email, values.password)}
      >
        {({ errors, touched, values }) => {
          const password = values.password.length >= 6;

          return (
            <Form>
              <Box className={style.inputThumb}>
                <Typography variant="caption" className={style.inputText}>
                  Email
                </Typography>
                <Field
                  className={style.input}
                  name="email"
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <Typography variant="subtitle1" className={style.helpfulText}>
                    {errors.email}
                  </Typography>
                )}
              </Box>
              <Box className={style.inputThumb}>
                <Typography variant="caption" className={style.inputText}>
                  Password
                </Typography>
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
                  <Typography variant="subtitle1" className={style.helpfulText}>
                    {errors.password}
                  </Typography>
                )}
              </Box>

              <BootstrapButton
                type="submit"
                disabled={!!errors.email || !password || auth}
              >
                Login
              </BootstrapButton>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default UserFormLogin;
