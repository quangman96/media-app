import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function DropDown({
  className,
  label,
  width,
  onChangeEvent,
  keyObj,
  data,
  reset,
  handleSetReset,
  selected,
  sxBox,
  sxSelect,
}) {
  const [valueSelected, setValueSelected] = useState(
    selected ? selected.value : data[0].value
  );
  const handleChange = (event) => {
    setValueSelected(event.target.value);
    if (typeof handleSetReset == "function") {
      handleSetReset(false);
    }
    onChangeEvent(event.target.value, keyObj);
  };

  useEffect(() => {
    if (reset) {
      setValueSelected(data[0].value);
    }
  }, [reset]);

  return (
    <Box
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
      width={width}
      sx={sxBox}
    >
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
            sx={sxSelect}
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
  );
}
