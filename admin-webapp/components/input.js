import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Input({
  label,
  placeHolder,
  icon,
  button,
  className,
  positionAdornment,
  onChangeEvent,
  keyObj,
  value,
  errors,
  validate
}) {

  const handleChange = (event) => {
    if (typeof onChangeEvent == 'function') { 
      onChangeEvent(event.target.value, keyObj);
    }
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
            {...validate}
            id={`outlined-adornment${label ? label.toLowerCase() : "-input"}`}
            placeholder={placeHolder}
            onChange={handleChange}
            value={value}
            endAdornment={positionAdornment !== "start" && icon}
            startAdornment={positionAdornment === "start" && icon}
            aria-describedby={`outlined-${
              label ? label.toLowerCase() : "input"
            }-helper-text`}
            style={button ? { width: "85%" } : { width: "100%" }}
            sx={{ borderRadius: "6px" }}
            className={className}
          />
          {button && button}
        </Box>

        {validate && (
          <FormHelperText
            id={`outlined-${label ? label.toLowerCase() : "input"}-helper-text`}
            style={{color: 'red', fontSize: '14px'}}
          >{errors}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
