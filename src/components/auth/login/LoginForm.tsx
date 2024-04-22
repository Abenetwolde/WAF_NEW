import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { useNavigate } from 'react-router-dom'
import { PATH_AUTH } from '../../../routes/paths';
// hooks
// import useAuth from '../../../hooks/useAuth';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../Iconify';
// import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../hook-form';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { setLoading, setToken } from '../../../redux/userSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // const { login } = useAuth();

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    username: 'pmo_admin',
    password: 'pmo@1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    // defaultValues,
  });

  const {
    reset,
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // event.preventDefault(); // Prevent page refresh

    try {
      console.log(".................login data",data)
      // const data = await methods.trigger(); // Trigger form validation
      const { username, password } = data;

      const response = await api.post('auth/login', { username, password });
      console.log("Login response:", response);

      if (response.data) {
        dispatch(setToken(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(setLoading(true))
        navigate("/dashboard/analysis");
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };
  // const { control } = useFormContext();/
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField  name="username"  label="User Name" />



        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} sx={undefined} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
