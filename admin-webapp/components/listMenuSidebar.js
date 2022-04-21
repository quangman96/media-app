import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <FeedOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Articles" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PostAddOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Article" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContentPasteOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PostAddOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Add Category" />
    </ListItemButton>
  </>
);

export const secondaryListItems = (
  <>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}

    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </>
);