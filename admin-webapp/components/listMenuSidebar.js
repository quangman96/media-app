import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import {linksInfo} from './../components/linksInfo';
import { useRouter } from 'next/router';
// import {signOut} from "firebase/auth";
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

// export const mainListItems = (
//   <>
//     <Link href={linksInfo[0].path}>
//       <ListItemButton onClick={abc}>
//         <ListItemIcon>
//           <FeedOutlinedIcon />
//         </ListItemIcon>
//         <ListItemText primary={linksInfo[0].name} />
//       </ListItemButton>
//     </Link>

//     <Link href={linksInfo[1].path}>
//       <ListItemButton>
//         <ListItemIcon>
//           <PostAddOutlinedIcon />
//         </ListItemIcon>
//         <ListItemText primary={linksInfo[1].name} />
//       </ListItemButton>
//     </Link>

//     <Link href={linksInfo[2].path}>
//       <ListItemButton>
//           <ListItemIcon>
//             <ContentPasteOutlinedIcon />
//           </ListItemIcon>
//           <ListItemText primary={linksInfo[2].name} />
//       </ListItemButton>
//     </Link>

//     <Link href={linksInfo[3].path}>
//       <ListItemButton>
//         <ListItemIcon>
//           <PostAddOutlinedIcon />
//         </ListItemIcon>
//         <ListItemText primary={linksInfo[3].name} />
//       </ListItemButton>
//     </Link>
//   </>
// );

// export const secondaryListItems = (
//   <>
//     {/* <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader> */}

//     <ListItemButton>
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="Logout" />
//     </ListItemButton>
//   </>
// );


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
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}

    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </>
  );
}