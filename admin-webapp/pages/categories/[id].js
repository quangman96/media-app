import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Box, Button, Paper } from "@mui/material";
import { useRouter } from 'next/router';
import { useState } from "react";
import ImgDialog from "../../components/imgDialog";
import Input from "../../components/input";
import { linksInfo } from '../../components/linksInfo';
import firebase from "../../utils/firebase";
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
const ButtonEdit = ({ className }) => (
  <Button
    id='submit-btn'
    variant="contained"
    className={className}
    style={{
      // width: "10%",
      // marginLeft: "5%",
      width: "100%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<DriveFileRenameOutlineIcon sx={{ fontSize: 100 }} />}
    type="submit"
  >
    Edit
  </Button>
);

export default function EditCategory({category, id}) {
  const [name, setName] = useState(category.name);
  const [img, setImg] = useState(category.image);
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of category is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  function onSubmit() {
    handleToggleBackdrop();
    if(img instanceof File)
      firebase.uploadImg(img, handleAfterUploadImg);
    else
      handleAfterUploadImg(img)
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
      image: downloadURL,
      name: name
    };
    await firebase.updateById("categories", data, id);
    router.push(linksInfo[2].path);
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  return (
    <Paper
      id='edit-category'
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
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
            button={<ButtonEdit className="btn-top" />}
            errors={errors.name?.message}
            validate={{...register('name')}}
          />
          <ImgDialog
            style={{ marginTop: "1%", marginBottom: "1%" }}
            onChangeEvent={handleOnChangeImg}
            reset={reset}
            handleSetReset={handleSetReset}
            defaultImg={img}
          />
          <ButtonEdit className="btn-bottom" />
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

export async function getServerSideProps(ctx) {
    const {params} = ctx;
    const category = await firebase.getById("categories", params.id)
    return {
      props: {
        category: category,
        id: params.id
      },
    };
  }
  