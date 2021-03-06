import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { linksInfo } from './../components/linksInfo';
import Copyright from "./copyright";
import { MainListItems, SecondaryListItems } from "./listMenuSidebar";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const checkPath = (path) => {
  const link = linksInfo.find(link => (link.path === path || (link.hasOwnProperty('regex') && new RegExp(link.regex).test(path))));
  return link ? link.name : "";
}

export default function Dashboard({ children, firebase }) {
  const router = useRouter();
  const pageName = checkPath(router.route);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(()=> {
    if(window.innerWidth <= 600)
      setOpen(false);
 }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Navigation */}
        <AppBar position="absolute" open={open} style={{background: "#51CBFF"}}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {pageName}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* SideBar */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{mr: '9%'}}
              // style={{ color: 'red' }}
            >
              <h2>Admin</h2>
              {/* <Typography
              component="h2"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin
            </Typography> */}
              <Avatar src="/avatar.jpeg" />
            
            </Stack>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          <List component="nav">
            {/* {mainListItems} */}
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
            <SecondaryListItems firebase={firebase} />
          </List>
        </Drawer>

        {/* Content */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {/* <Container maxWidth="lg" style={{ marginTop: '1.5%', height: '85.5%', borderRadius: '8px' }}> */}
          <Container maxWidth="lg" style={{ marginTop: '1.5%', height: 'fit-content', borderRadius: '8px' }}>
          {children}
            {/* <Grid container spacing={3}>
              <Grid className="zxzx" item xs={12} md={8} lg={9}>
                <Paper
                className="azaz"
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: '100%',
                  }}
                >
                  {children}
                </Paper>
              </Grid>
            </Grid> */}
            <Copyright sx={{ pt: 3 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
