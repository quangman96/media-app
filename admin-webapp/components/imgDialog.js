import React from "react";
import { Button, Box, InputLabel, FormControl } from "@mui/material";

const styling = {
    backgroundImage: `url(/image.png)`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    backgroundSize: '100% 100%',
    // marginTop: '1%'
    //   position: 'fixed',
    //   top: '11%',
    //   left: '37%'
  };

export default function ImgDialog({style}) {
  return (
<Box sx={{ display: "flex", flexWrap: "wrap", height: 1}} {...style}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel
          shrink
          htmlFor="img-dialog"
          sx={{fontSize: 18}}
        >
          Image
        </InputLabel>

        <Box className="zzz" sx={{ display: "flex", flexWrap: "wrap", mt: '3%', height: 1 }}>
        <Button id="img-dialog" sx={{...styling}} />
        </Box>
      </FormControl>
    </Box>
  );
  // return <Button sx={{...styling}} />;
}
