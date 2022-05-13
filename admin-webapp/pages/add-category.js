import AddBoxIcon from "@mui/icons-material/AddBox";
import { Box, Button, Paper } from "@mui/material";
import { useState } from "react";
import ImgDialog from "../components/imgDialog";
import Input from "../components/input";
import firebase from "../utils/firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem"
};
const ButtonCreate = ({className}) => (
  <Button
    variant="contained"
    id="submit-btn"
    className={className}
    style={{
      // width: "10%",
      // marginLeft: "5%",
      width: "100%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<AddBoxIcon />}
    type="submit"
    // onClick={onClick}
  >
    Create
  </Button>
);

export default function AddCategory() {
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fimage.png?alt=media&token=2230ed0c-035a-4b66-a043-25052dc563ab"
  const [name, setName] = useState("");
  const [img, setImg] = useState(defaultImg);
  const [resetData, setResetData] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of category is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  function onSubmit(data, e) {
    handleToggleBackdrop();
    if(img instanceof File)
      firebase.uploadImg(img, handleAfterUploadImg);
    else
      handleAfterUploadImg(img)
    reset();
    return false;
  }

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
    setResetData(true);
    handleCloseBackdrop();
  };

  const handleSetReset = (value) => {
    setResetData(value);
  };

  return (
    <Paper
      id='add-category'
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        mt: "5%"
      }}
    >
      <form style={{ height: "100%", padding: "2%" }} onSubmit={handleSubmit(onSubmit)}>
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
            button={<ButtonCreate className="btn-top" />}
            errors={errors.name?.message}
            validate={{...register('name')}}
          />
          <ImgDialog
            style={{ marginTop: "1%", marginBottom: "1%" }}
            onChangeEvent={handleOnChangeImg}
            reset={resetData}
            handleSetReset={handleSetReset}
            defaultImg={img}
          />
          <ButtonCreate className="btn-bottom" />
        </Box>
      </form>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}