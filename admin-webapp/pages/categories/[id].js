import Input from "../../components/input";
import { Box, Button, Paper } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ImgDialog from "../../components/imgDialog";
import { useState } from "react";
import firebase from "../../utils/firebase";
import EditIcon from '@mui/icons-material/Edit';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem"
};
const ButtonEdit = ({ onClick }) => (
  <Button
    variant="contained"
    style={{
      width: "10%",
      marginLeft: "5%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<DriveFileRenameOutlineIcon sx={{ fontSize: 100 }} />}
    onClick={onClick}
  >
    Edit
  </Button>
);

export default function EditCategory({category, id}) {
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fimage.png?alt=media&token=2230ed0c-035a-4b66-a043-25052dc563ab"
  const [name, setName] = useState(category.name);
  const [img, setImg] = useState(category.image);
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
      image: downloadURL,
      name: name
    };
    await firebase.updateById("categories", data, id);
    setName("");
    setImg(defaultImg);
    setReset(true);
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  const handleOnEdit = () => {
    if(img instanceof File)
        firebase.uploadImg(img, handleAfterUploadImg);
    else
        handleAfterUploadImg(img)
  };

  return (
    <Paper
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
            button={<ButtonEdit onClick={handleOnEdit} />}
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

// export async function getStaticProps() {
//     const category = await firebase.getById("categories", "2Flt992wVdUgtwvyNetx")
//     return {
//       props: {
//         category: category,
//       }
//     };
//   }

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
  