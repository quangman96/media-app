import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button, Paper } from "@mui/material";
import { useState } from "react";
import ImgDialog from "../components/imgDialog";
import Input from "../components/input";
import firebase from "../utils/firebase";

const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem"
};
const ButtonCreate = ({ onClick }) => (
  <Button
    variant="contained"
    id="submit-btn"
    style={{
      width: "10%",
      marginLeft: "5%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<AddBoxIcon />}
    onClick={onClick}
  >
    Create
  </Button>
);

export default function AddCategory() {
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fimage.png?alt=media&token=2230ed0c-035a-4b66-a043-25052dc563ab"
  const [name, setName] = useState("");
  const [img, setImg] = useState(defaultImg);
  const [reset, setReset] = useState(false);

  const handleOnChangeName = (value) => {
    setName(value);
  };

  const handleOnChangeImg = (img) => {
    setImg(img);
  };

  const handleAfterUploadImg = async (downloadURL) => {
    const time = new Date().getTime();
    const data = {
      change_at: time,
      change_by: "admin",
      create_at: time,
      create_by: "admin",
      image: downloadURL,
      is_delete: false,
      name: name
    };
    await firebase.create("categories", data);
    setName("");
    setImg(defaultImg);
    setReset(true);
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  const handleOnCreate = () => {
    if(img instanceof File)
      firebase.uploadImg(img, handleAfterUploadImg);
    else
      handleAfterUploadImg(img)
  };

  return (
    <Paper
      className='add-category'
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <form style={{ height: "100%", padding: "2%" }}>
        <Box
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <Input
            label="Name"
            placeHolder="Input text"
            onChangeEvent={handleOnChangeName}
            value={name}
            button={<ButtonCreate onClick={handleOnCreate} />}
          />
          <ImgDialog
            style={{ marginTop: "1%", marginBottom: "1%" }}
            onChangeEvent={handleOnChangeImg}
            reset={reset}
            handleSetReset={handleSetReset}
            defaultImg={img}
          />
        </Box>
      </form>
    </Paper>
  );
}