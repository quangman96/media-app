import { Box, Grid } from "@mui/material";
import FormLogin from "./formLogin";

const stylingSmall = {
  backgroundImage: `url(/login.png)`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  backgroundSize: '92%',
    position: 'fixed',
    top: '5%',
    left: '4%'
};

const stylingLarge = {
  backgroundImage: `url(/login.png)`,
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%",
  backgroundSize: '60%',
  position: 'fixed',
  top: '11%',
  left: '37%'
};

export default function Login() {
  return (
    <Box id="login-page">
      <Box className="login-small">
        <Box sx={{m: "7%"}}>
          <img src="/login.png" alt="login" style={{width: "100%"}}></img>
        </Box>
        <Box sx={{m: "7%", mt: "-4%"}}>
          <FormLogin />
        </Box>
      </Box>

      <Grid className="login-large" container columns={7} sx={{ height: '100vh', display: "none"  }}>
        <Grid item xs={3}>
          <FormLogin />
        </Grid>
        <Grid item xs={4}>
          <Grid container columns={10} sx={{ height: "100%" }}>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={6} sx={{ background: "#E1F8FF" }}>
              <Box className="login-img" style={stylingLarge}></Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}