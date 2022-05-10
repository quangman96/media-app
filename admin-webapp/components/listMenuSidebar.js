import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useRouter } from 'next/router';
import { linksInfo } from './../components/linksInfo';
export function MainListItems() {
  const {route} = useRouter();
  const active = "link-active";
  return (
    <div>
    <Link href={linksInfo[0].path}>
      <ListItemButton className={linksInfo[0].path === route ? active : ""}>
        <ListItemIcon>
          <FeedOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[0].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[1].path}>
      <ListItemButton className={linksInfo[1].path === route ? active : ""}>
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[1].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[2].path}>
      <ListItemButton className={linksInfo[2].path === route ? active : ""}>
          <ListItemIcon>
            <ContentPasteOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={linksInfo[2].name} />
      </ListItemButton>
    </Link>

    <Link href={linksInfo[3].path}>
      <ListItemButton className={linksInfo[3].path === route ? active : ""}>
        <ListItemIcon>
          <PostAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={linksInfo[3].name} />
      </ListItemButton>
    </Link>
  </div>
  );
}

export function SecondaryListItems({firebase}) {
  const route = useRouter();
  const handleLogout = () => {
    const auth = firebase.auth;
    auth.signOut().then(() => {
      console.log("logout");
      route.push("/")
    }).catch((error) => {
      console.log("logout error");
    });
  }

  return (
    <>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </>
  );
}