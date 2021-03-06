import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";

export default function InputPassword({onChangeEvent, value, errors, validate}) {
  const [passwordObj, setPasswordObj] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPasswordObj({ ...passwordObj, [prop]: event.target.value });
    if (typeof onChangeEvent == 'function') { 
      onChangeEvent(event.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setPasswordObj({
      ...passwordObj,
      showPassword: !passwordObj.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel shrink htmlFor="outlined-adornment-password" sx={{ fontSize: 18 }}>
          Password
        </InputLabel>
        <OutlinedInput
          {...validate}
          id="outlined-adornment-password"
          type={passwordObj.showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange("password")}
          placeholder="Password"
          sx={{ mt: 3}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                style={{ marginRight: '-5px' }}
                sx={{ color: '#979797'}}
              >
                {passwordObj.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="outlined-password-helper-text" style={{color: 'red', fontSize: '14px'}}>{errors}</FormHelperText>
      </FormControl>
    </Box>
  );
}