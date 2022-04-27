import { Grid, Box } from "@mui/material";
import FormLogin from "./formLogin";
import { useAuth } from '../utils/AuthUserProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const styling = {
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
  // const { authUser, loading } = useAuth();
  // console.log(authUser)
  // console.log(loading)
  //   // Listen for changes on loading and authUser, redirect if needed
  //   useEffect(() => {
  //     if (!loading && !authUser)
  //       router.push('/')
  //   }, [authUser, loading])

  return (
    <Grid container columns={7} sx={{ height: '100vh'  }}>
      <Grid item xs={3}>
        <FormLogin />
      </Grid>
      <Grid item xs={4}>
        <Grid container columns={10} sx={{ height: "100%" }}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={6} sx={{ background: "#E1F8FF" }}>
            <Box style={styling}></Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}