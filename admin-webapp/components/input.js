// // import * as React from 'react';
// // import { alpha, styled } from '@mui/material/styles';
// // import InputBase from '@mui/material/InputBase';
// // import Box from '@mui/material/Box';
// // import InputLabel from '@mui/material/InputLabel';
// // import TextField from '@mui/material/TextField';
// // import FormControl from '@mui/material/FormControl';
// // import MailOutlineIcon from '@mui/icons-material/MailOutline';
// // import styles from "../styles/Input.module.css"

// // const iconStyle = {
// //   position: 'absolute',
// //     right: '2vh',
// //     top: '2vh',
// //     zIndex: '999'
// // }

// // const BootstrapInput = styled(InputBase)(({ theme }) => ({
// //   'label + &': {
// //     marginTop: theme.spacing(3),
// //   },
// //   '& .MuiInputBase-input': {
// //     borderRadius: 4,
// //     position: 'relative',
// //     backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
// //     border: '1px solid #ced4da',
// //     fontSize: 16,
// //     width: '100%',
// //     padding: '10px 12px',
// //     transition: theme.transitions.create([
// //       'border-color',
// //       'background-color',
// //       'box-shadow',
// //     ]),
// //     // Use the system font instead of the default Roboto font.
// //     fontFamily: [
// //       '-apple-system',
// //       'BlinkMacSystemFont',
// //       '"Segoe UI"',
// //       'Roboto',
// //       '"Helvetica Neue"',
// //       'Arial',
// //       'sans-serif',
// //       '"Apple Color Emoji"',
// //       '"Segoe UI Emoji"',
// //       '"Segoe UI Symbol"',
// //     ].join(','),
// //     '&:focus': {
// //       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
// //       borderColor: theme.palette.primary.main,
// //     },
// //   },
// // }));

// // // export default function Input(props) {
// // //   const {label} = props
// // //   return (
// // //     <Box
// // //       component="form"
// // //       noValidate
// // //       sx={{
// // //         display: 'grid',
// // //         gridTemplateColumns: { sm: '1fr 1fr' },
// // //         gap: 2,
// // //       }}
// // //     >
// // //       <FormControl variant="standard">
// // //         <InputLabel shrink htmlFor="bootstrap-input">
// // //           {label}
// // //         </InputLabel>
// // //         <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
// // //       </FormControl>
// // //     </Box>
// // //   );
// // // }

// // export default function Input({label, placeHolder, icon}) {
// //   return (
// //     <Box
// //       sx={{
// //         p: 1,
// //         width: 1
// //       }}
// //     >
// //       <FormControl variant="standard" sx={{width: 1}}>
// //         <InputLabel shrink htmlFor="bootstrap-input">
// //          {label}
// //         </InputLabel>
// //         {icon}
// //       <BootstrapInput id="bootstrap-input" placeholder={placeHolder} />
// //       </FormControl>
// //     </Box>
// //   );
// // }

// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import { useState } from "react";
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import { Button, Paper } from "@mui/material";

// export default function Input({ label, placeHolder, icon, button }) {
//   const [value, setValue] = useState("");

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//       <FormControl sx={{ width: 1 }} variant="standard">
//         <InputLabel
//           shrink
//           htmlFor={"outlined-adornment-" + label.toLowerCase()}
//           sx={{fontSize: 18}}
//         >
//           {label}
//         </InputLabel>
//         <OutlinedInput
//           id="outlined-adornment-email"
//           placeholder={placeHolder}
//           value={value}
//           onChange={handleChange}
//           endAdornment={icon}
//           aria-describedby={"outlined-" + label.toLowerCase() + "-helper-text"}
//           sx={{ mt: 3 }}
//         />
//         <Button variant="contained" endIcon={<AddBoxIcon />}>Create</Button>
//         <FormHelperText
//           id={"outlined-" + label.toLowerCase() + "-helper-text"}
//         ></FormHelperText>
//       </FormControl>
//     </Box>
//   );
// }

// import * as React from 'react';
// import { alpha, styled } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import styles from "../styles/Input.module.css"

// const iconStyle = {
//   position: 'absolute',
//     right: '2vh',
//     top: '2vh',
//     zIndex: '999'
// }

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     width: '100%',
//     padding: '10px 12px',
//     transition: theme.transitions.create([
//       'border-color',
//       'background-color',
//       'box-shadow',
//     ]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// // export default function Input(props) {
// //   const {label} = props
// //   return (
// //     <Box
// //       component="form"
// //       noValidate
// //       sx={{
// //         display: 'grid',
// //         gridTemplateColumns: { sm: '1fr 1fr' },
// //         gap: 2,
// //       }}
// //     >
// //       <FormControl variant="standard">
// //         <InputLabel shrink htmlFor="bootstrap-input">
// //           {label}
// //         </InputLabel>
// //         <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
// //       </FormControl>
// //     </Box>
// //   );
// // }

// export default function Input({label, placeHolder, icon}) {
//   return (
//     <Box
//       sx={{
//         p: 1,
//         width: 1
//       }}
//     >
//       <FormControl variant="standard" sx={{width: 1}}>
//         <InputLabel shrink htmlFor="bootstrap-input">
//          {label}
//         </InputLabel>
//         {icon}
//       <BootstrapInput id="bootstrap-input" placeholder={placeHolder} />
//       </FormControl>
//     </Box>
//   );
// }

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

export default function Input({
  label,
  placeHolder,
  icon,
  button,
  className,
  positionAdornment,
  formHelperText = false,
  onChangeEvent,
  value
}) {
  // const [value, setValue] = useState("");

  const handleChange = (event) => {
    // setValue(event.target.value);
    onChangeEvent(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", width: 1 }}>
      <FormControl sx={{ width: 1 }} variant="standard">
        {label && (
          <InputLabel
            shrink
            htmlFor={"outlined-adornment-" + label.toLowerCase()}
            sx={{ fontSize: 18 }}
          >
            {label}
          </InputLabel>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
          <OutlinedInput
            id={`outlined-adornment${label ? label.toLowerCase() : "-input"}`}
            placeholder={placeHolder}
            value={value}
            onChange={handleChange}
            endAdornment={positionAdornment !== 'start' && icon}
            startAdornment={positionAdornment === 'start' && icon}
            aria-describedby={`outlined-${
              label ? label.toLowerCase() : "input"
            }-helper-text`}
            style={button ? { width: "85%" } : { width: "100%" }}
            sx={{ borderRadius: "6px" }}
            className={className}
          />

          {/* <TextField
            id={`outlined-adornment-${label ? label.toLowerCase() : "input"}`}
            placeholder={placeHolder}
            value={value}
            onChange={handleChange}
            InputProps={positionAdornment === 'start'? {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            } : {
              endAdornment: (
                <InputAdornment position="end">{icon}</InputAdornment>
              )
            }}
            aria-describedby={`outlined-${
              label ? label.toLowerCase() : "input"
            }-helper-text`}
            style={button ? { width: "85%" } : { width: "100%"}}
            sx={{'& fieldset': {
              borderRadius: '6px',
            } }}
            className={className}
          /> */}
          {button && button}
        </Box>

        {formHelperText === "true" && (
          <FormHelperText
            id={`outlined-${label ? label.toLowerCase() : "input"}-helper-text`}
          ></FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
