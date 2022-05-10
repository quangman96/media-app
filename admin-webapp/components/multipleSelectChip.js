import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const getDefaultData = (selected, data) => {
  return selected ? data.filter((elem) => selected.find(({ value }) => elem.value === value)) : [data[0]];
}

export default function MultipleSelectChip({
  label,
  width,
  onChangeEvent,
  keyObj,
  data,
  reset,
  handleSetReset,
  selected
}) {
  const [valueSelected, setValueSelected] = useState(getDefaultData(selected, data));
  const handleChange = (event) => {
    setValueSelected(event.target.value);
    const value = event.target.value.map((child) => {
      return child.value;
    });
    handleSetReset(false);
    onChangeEvent(value, keyObj);
  };

  useEffect(() => {
    if (reset) {
      setValueSelected([data[0]]);
    }
  }, [reset]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }} width={width}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel shrink htmlFor="multiple-chip-label" sx={{ fontSize: 18 }}>
          {label}
        </InputLabel>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3 }}>
          <Select
            variant="outlined"
            labelId="multiple-chip-label"
            multiple
            id="select"
            value={valueSelected}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" />}
            style={{ width: "100%", borderRadius: "6px" }}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((child) => (
                  <Chip key={child.value} label={child.text} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {data.map((child) => (
              <MenuItem key={child.value} value={child}>
                <Checkbox checked={valueSelected.some(item => child.value === item.value)} />
                <ListItemText primary={child.text} />
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
}
