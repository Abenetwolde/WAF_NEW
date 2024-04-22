import PropTypes from 'prop-types';
// form
import { useFormContext, Controller, useForm } from 'react-hook-form';
// @mui
// import { useForm } from "react-hook-form";
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();
  // const { register} = useForm()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field}   fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
