import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Tooltip, MenuItem, FormControl, Select, Typography, useTheme } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config

import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import ContactsPopover from './ContactsPopover';
// import NotificationsPopover from './NotificationsPopover';
import Image from "../../../components/Image";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirewalls, setSelectedFirewall } from '../../../redux/firewall/firewall';
import { useEffect, useState } from 'react';
// import { userLogout } from '../../../redux/userSlice';

import {  IconButton, Popover,Link, Avatar } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { userLogout } from '../../../redux/user';
import { useFetchFirewallsQuery } from '../../../redux/firewall/firewallAPi';
// import { theme } from 'antd';
// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {

    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
const navigate=useNavigate()
;
const theme = useTheme();
const token =useSelector(state=> state.auth.user)

const header:any =  {headers: {
  Authorization: token
}}

 const { data, error, isLoading }:any = useFetchFirewallsQuery(header)
console.log("firewalls...............",data?.response||[])
  const isDesktop = useResponsive('up', 'lg');
  const dispatch = useDispatch();

  const selectedFirewall = useSelector((state) => state?.firewall.selectedFirewall);
  const handleFirewallSelect = (firewall) => {
    dispatch(setSelectedFirewall(firewall));
  };
const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear token from localStorage and Redux state
    // localStorage.removeItem('user');
    dispatch(userLogout());
    navigate.navigate("auth/login")
    // Redirect to login page
    // window.location.href = '/login'; // or use React Router's history for navigation
  };

  const open = Boolean(anchorEl);
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{display:"flex",alignItems:"center", justifyContent:"center"}}>
          <>
          </>
         {isLoading? <Box sx={{  backgroundColor: theme.palette.grey[isLight ? 900 : 0],}} height={40} width={200}>
                <Typography>Loading.....</Typography>:
              </Box>
         :
          <Box height={30} width={200} >
          <FormControl fullWidth>

            <Select
              labelId="firewall-label"
              id="firewall"
              defaultValue={selectedFirewall ? selectedFirewall?.hostname : 'Select a Firewall'}
              value={selectedFirewall ? selectedFirewall.hostname : 'Select a Firewall'}
              renderValue={(value) => (
                <Typography variant="body1" color="textPrimary">
                  {value || 'Select a Firewall'}
                </Typography>
              )}
            // onChange={(event) => handleFirewallSelect(event.target.value)}
            >
              {/* {selectedFirewall ? selectedFirewall.hostname : 'Select a Firewall'} */}



              {  data?.response?.map((firewall) => (
                <MenuItem key={firewall._id} value={firewall.hostname} onClick={() => handleFirewallSelect(firewall)}>
                  {firewall?.hostname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
         }
         
          <Stack direction="row" alignItems="center" onClick={handlePopoverOpen} spacing={{ xs: 0.5, sm: 1.5 }}>
            <IconButtonAnimate placement="right">
              {/* <a href="https://github.com/shakilhasan/sabil"> */}
              <Image
                disabledEffect
                src={"https://th.bing.com/th/id/R.7cc6700806813e7b59d4d99246153a31?rik=OAY9pMXChvkauw&pid=ImgRaw&r=0"}
                // src={`/icons/ic_github.svg`}
                sx={{ width: 42, height: 42 }}
              />
              {/* </a> */}
            </IconButtonAnimate>

            {/* <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover />
          <AccountPopover /> */}
          </Stack>
          <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack direction="column" alignItems="center" spacing={1} sx={{ p: 1 }}>
          <Link to="#" onClick={handleLogout}>
            <IconButton color="inherit">
              <Logout fontSize="small" />
            </IconButton>
            Logout
          </Link>
        </Stack>
      </Popover>
        </Box>
      </Toolbar>
    </RootStyle>
  );
}
