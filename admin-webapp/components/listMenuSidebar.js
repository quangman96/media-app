import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import {linksInfo} from './../components/linksInfo';

export const mainListItems = (
  <>
    <Link href={linksInfo[0].path}>
      <ListItemButton>
        <ListItemIcon>
          <FeedOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[0].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[1].path}>
      <ListItemButton>
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[1].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[2].path}>
      <ListItemButton>
          <ListItemIcon>
            <ContentPasteOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={linksInfo[2].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[3].path}>
      <ListItemButton>
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[3].name} />
      </ListItemButton>
    </Link>
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
