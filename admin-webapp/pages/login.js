import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormLogin from "../components/formLogin";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  return (
    <Grid container columns={7} sx={{ height: '100vh'  }}>
      <Grid item xs={3}>
        <FormLogin />
        {/* <Item>xs=8</Item> */}
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

    //   <div style={{ width: '100%', height: '100%' }}>
    //   <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
    //     <Item>1</Item>
    //     <Item>2</Item>
    //   </Box>
    // </div>
  );
}
