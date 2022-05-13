import { Box, FormControl, InputLabel, TextareaAutosize } from "@mui/material";
import customStyle from "../styles/TextArea.module.css";
export default function TextArea({
  label,
  placeHolder,
  maxRows,
  style,
  onChangeEvent,
  keyObj,
  value
}) {
  const handleChange = (event) => {
    onChangeEvent(event.target.value, keyObj);
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel shrink htmlFor="text-area" sx={{ fontSize: 18 }}>
          {label}
        </InputLabel>

        <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3, height: 1 }}>
          <TextareaAutosize
            className={customStyle["text-area"]}
            onChange={handleChange}
            id="text-area"
            maxRows={maxRows ? maxRows : "1"}
            minRows={maxRows ? maxRows : "1"}
            placeholder={placeHolder}
            style={{
              borderColor: "#c4c4c4",
              fontSize: "18px",
              padding: "2%",
              ...style
            }}
            value={value}
          />
        </Box>
      </FormControl>
    </Box>
  );
}
