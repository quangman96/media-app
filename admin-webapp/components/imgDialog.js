import React from "react";
import { Button, Box, InputLabel, FormControl } from "@mui/material";
import { useState, useEffect } from "react";

export default function ImgDialog({
  style,
  onChangeEvent,
  keyObj,
  reset,
  handleSetReset,
  defaultImg
}) {
  const [pathImg, setPathImg] = useState(defaultImg);
  const handleOnChangeImg = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const path = URL.createObjectURL(e.target.files[0]);
      setPathImg(path);
      handleSetReset(false);
      onChangeEvent(e.target.files[0], keyObj);
    }
  };

  useEffect(() => {
    if (reset) {
      setPathImg(defaultImg);
    }
  }, [reset]);

  const styling = {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${pathImg})`,
    // backgroundImage: `url(${reset ? '/image.png': pathImg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#f2f2f2",
    // // backgroundSize: "100% 100%",
    backgroundSize: "contain",
    backgroundPosition: "center"
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", height: 1 }} {...style}>
      <FormControl sx={{ width: 1 }} variant="standard">
        <InputLabel shrink htmlFor="img-dialog" sx={{ fontSize: 18 }}>
          Image
        </InputLabel>

        <Box
          className="zzz"
          sx={{ display: "flex", flexWrap: "wrap", mt: "3%", height: 1 }}
        >
          <Button
            id="img-dialog"
            sx={{
              ...styling,
              "&:hover": {
                backgroundColor: "#f2f2f2"
              }
              // backgroundImage: `url(${isReset ? pathImg : '/image.png'})`,
            }}
          >
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              style={{ width: "100%", height: "100%", opacity: 0 }}
              onChange={handleOnChangeImg}
            />
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
  // return <Button sx={{...styling}} />;
}
