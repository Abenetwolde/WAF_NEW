import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box , Typography} from '@mui/material';
import logoImage from '../assets/GashaLogo.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box sx={{ display:'flex',gap:2,alignItem:"center",justifayContent:"center",width: 50, height: 50, ...sx }}>
      <img
        src={logoImage}
        alt="Logo"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {/* <Typography>WAF</Typography> */}
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
