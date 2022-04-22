// import Input from "../components/input";
// import { Box, Button, Paper, Grid } from "@mui/material";
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import ImgDialog from "../components/imgDialog";
// import { styled } from '@mui/material/styles';
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

// const commonStyles = {
//   bgcolor: "background.paper",
//   border: 1,
//   width: "5rem",
//   height: "5rem",
// };
// const button = <Button variant="contained" style={{width: '10%', marginLeft: '5%', borderRadius: '6px'}} endIcon={<AddBoxIcon />}>Create</Button>

// export default function AddArticle() {
//   return (
// //     <form style={{ height: "100%"}}>
// //     <Box sx={{ flexGrow: 1 }}>
// //     <Grid container spacing={5}>
// //       <Grid xs={6} style={{background: 'red'}}>
// //             <h1>1</h1>
// //       </Grid>
// //       <Grid xs={6} style={{background: 'yellow'}}>
// //       <h1>2</h1>
// //       </Grid>
// //       <Grid xs={12} style={{background: 'green'}}>
// //       <h1>3</h1>
// //       </Grid>
// //     </Grid>
// //   </Box>
// //     </form>
// <Box sx={{ flexGrow: 1, height: 1 }}>
// <Grid container spacing={1} sx={{ height: 1 }}>
//   <Grid xs={6} style={{background: 'red'}}>
//   <Item>xs=8</Item>
//   </Grid>
//   <Grid xs={6} style={{background: 'yellow'}}>
//   <Item>xs=8</Item>
//   </Grid>
//   <Grid xs={12} style={{background: 'green'}}>
//   <Item>xs=8</Item>
//   </Grid>
// </Grid>
// </Box>

//     // <Paper
//     //   sx={{
//     //     display: "flex",
//     //     flexDirection: "column",
//     //     height: "100%",
//     //   }}
//     // >
//     //   <form style={{ height: "100%", padding: '2%' }}>
//     //     <Box
//     //       sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
//     //       style={{
//     //         borderColor: "#F6CA56",
//     //         borderStyle: "dashed",
//     //         display: "flex",
//     //         flexDirection: "column",
//     //         height: "100%",
//     //       }}
//     //     >
//     //       <Input label="Name" placeHolder="Input text" button={button} />
//     //       <ImgDialog />
//     //     </Box>
//     //   </form>
//     // </Paper>
//   );
// }

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function AddArticle() {
//   return (
//     <Box className='abc' sx={{ flexGrow: 1, height: 1 }}>
//       <Grid container spacing={5} sx={{ height: 1 }}>
//         <Grid item xs={6} sx={{background: 'red'}}>
//           <Item>xs=8</Item>
//         </Grid>
//         <Grid item xs={6} sx={{background: 'yellow'}}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={12} sx={{background: 'green'}}>
//           <Item>xs=4</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

import Input from "../components/input";
import { Box, Button, Paper, Grid } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem",
};
const button = (
  <Button
    variant="contained"
    style={{ width: "10%", marginLeft: "5%", borderRadius: "6px" }}
    endIcon={<AddBoxIcon />}
  >
    Create
  </Button>
);

export default function AddArticle() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <form style={{ height: "100%", padding: "2%" }}>
        <Box
          className="abc"
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Grid container sx={{ m: 0, height: 1, p: "0.7%" }}>
            <Grid item xs={6}>
              <Grid container sx={{ height: 1 }}>
              <Grid item xs={12} sx={{ background: "red" }}>
                <Input label="Name" placeHolder="Input text" />
                </Grid>
                <Grid item xs={12} sx={{ background: "yellow" }}>
                <Input label="Name" placeHolder="Input text" />
                </Grid>
                <Grid item xs={12} sx={{ background: "green" }}>
                <Input label="Name" placeHolder="Input text" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ background: "yellow" }}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={12} sx={{ background: "green" }}>
              <Item>xs=4</Item>
            </Grid>
          </Grid>
        </Box>

        {/* <Box
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 8">
          <Item>xs=8</Item>
        </Box>
        <Box gridColumn="span 4">
          <Item>xs=4</Item>
        </Box>
        <Box gridColumn="span 12">
          <Item>xs=12</Item>
        </Box>
      </Box>
    </Box> */}
      </form>
    </Paper>
  );
}
