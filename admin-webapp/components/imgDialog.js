import React from "react";
import { Button } from "@mui/material";

const styling = {
    backgroundImage: `url(/image.png)`,
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    backgroundSize: '100% 100%',
    marginTop: '1%'
    //   position: 'fixed',
    //   top: '11%',
    //   left: '37%'
  };

export default function ImgDialog() {
  return <Button sx={{...styling}} />;
}
