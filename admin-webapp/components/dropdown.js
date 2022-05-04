import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  NativeSelect
} from "@mui/material";
import { useState, useEffect } from "react";

export default function DropDown({
  label,
  width,
  onChangeEvent,
  keyObj,
  data,
  reset,
  handleSetReset
}) {
  const [valueSelected, setValueSelected] = useState(data[0].value);
  const handleChange = (event) => {
    setValueSelected(event.target.value);
    handleSetReset(false);
    onChangeEvent(event.target.value, keyObj);
  };

  useEffect(() => {
    if (reset) {
      setValueSelected(data[0].value);
    }
  }, [reset]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} width={width}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel shrink htmlFor="select-label" sx={{ fontSize: 18 }}>
          {label}
        </InputLabel>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
          <Select
            variant="outlined"
            labelId="select-label"
            id="select"
            value={valueSelected}
            onChange={handleChange}
            style={{ width: "100%", borderRadius: "6px" }}
          >
            {data.map((child) => (
              <MenuItem key={child.value} value={child.value}>
                {child.text}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
    // <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start"}} width={width}>
    //   <FormControl fullWidth>
    //     <InputLabel shrink htmlFor="select" sx={{ fontSize: 18 }}>
    //       {label}
    //     </InputLabel>
    //     <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
    //       <Select
    //         variant="outlined"
    //         labelId="select-label"
    //         id="select"
    //         value={value}
    //         onChange={handleChange}
    //         style={{width: '100%', borderRadius: '6px'}}
    //       >
    //         <MenuItem value={1}>test</MenuItem>
    //         <MenuItem value={2}>Family</MenuItem>
    //         <MenuItem value={3}>Entertainment</MenuItem>
    //       </Select>
    //     </Box>
    //   </FormControl>
    // </Box>
  );
}
