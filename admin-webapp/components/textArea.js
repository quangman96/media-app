import { Box, TextareaAutosize, FormControl, InputLabel } from "@mui/material";
import customStyle from '../styles/TextArea.module.css'

export default function TextArea({ label, placeHolder, minRows, style }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel
          shrink
          htmlFor="text-area"
          sx={{ fontSize: 18 }}
        >
          {label}
        </InputLabel>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3, height: 1 }}>
          <TextareaAutosize
          className={customStyle['text-area']}
            id="text-area"
            minRows={minRows ? minRows : '1'}
            placeholder={placeHolder}
            style={{ borderColor: '#c4c4c4', fontSize: '18px', padding: '2%', ...style}}
          />
        </Box>
      </FormControl>
    </Box>
  );
}
