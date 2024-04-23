// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import SvgIconStyle from '../../../components/SvgIconStyle';
import dash from  '../../assets/menuIcons/dashboard.svg'
// ----------------------------------------------------------------------
// ../assets/menuIcons/dashboard.svg
import { Dashboard as DashboardIcon } from '@mui/icons-material'; 
const getIcon = (name) => <SvgIconStyle src={`../../assets/menuIcons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {

  dashboard: getIcon('dashboard'),

};
console.log("ICONS.dashboard..................",ICONS.dashboard)
const navConfig = [
  // // GENERAL
  // // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Analaysis', path: PATH_DASHBOARD.general.app, icon: <DashboardIcon/> },

    ],
  },

 
];

export default navConfig;
