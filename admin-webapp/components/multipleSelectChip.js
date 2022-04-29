import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import {useState} from 'react';

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


export default function MultipleSelectChip({label, width, onChangeEvent, keyObj, data}) {
  const [valueSelected, setValueSelected] = useState([data[0]]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setValueSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onChangeEvent(event.target.value, keyObj);
  };

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
            input={<OutlinedInput id="select-multiple-chip"/>}
            style={{ width: "100%", borderRadius: "6px" }}
            renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
          >
            {data.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={valueSelected.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
}
