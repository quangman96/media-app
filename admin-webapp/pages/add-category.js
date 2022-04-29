import Input from "../components/input";
import { Box, Button, Paper } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImgDialog from "../components/imgDialog";
import { useState } from "react";
import firebase from '../utils/firebase';

const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem",
};
const ButtonCreate = ({onClick}) => <Button variant="contained" style={{width: '10%', marginLeft: '5%', borderRadius: '6px', background: "#51CBFF"}} endIcon={<AddBoxIcon />} onClick={onClick}>Create</Button>

export default function AddCategory() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [reset, setReset] = useState(false);

  const handleOnChangeName = (value) => {
    setName(value);
  }

  const handleOnChangeImg = (img) => {
    setImg(img)
  }

  const handleAfterUploadImg = async (downloadURL) => {
    const time = new Date().getTime();
    const data = {
      change_at: time,
      change_by: "admin" ,
      create_at: time,
      create_by: "admin",
      image: downloadURL,
      is_delete:false,
      name: name,
    };
    await firebase.create("categories", data)
    setName("");
    setImg("");
    setReset(true);
}

  const handleOnCreate = () => {
    firebase.uploadImg(img, handleAfterUploadImg);
    console.log("handleOnCreate")
  }

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <form style={{ height: "100%", padding: '2%' }}>
        <Box
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Input label="Name" placeHolder="Input text" onChangeEvent={handleOnChangeName} value={name} button={<ButtonCreate onClick={handleOnCreate} />} />
          <ImgDialog style={{marginTop: '1%', marginBottom: '1%'}} onChangeEvent={handleOnChangeImg} reset={reset}/>
        </Box>
      </form>
    </Paper>
  );
}





// // App.js
// // Kindacode.com
// import { useState } from "react";
// const AddCategory = () => {
//   const [selectedImage, setSelectedImage] = useState();

//   // This function will be triggered when the file field change
//   const imageChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

//   // This function will be triggered when the "Remove This Image" button is clicked
//   const removeSelectedImage = () => {
//     setSelectedImage();
//   };

//   return (
//     <>
//       <div style={styles.container}>
//         <input
//           accept="image/*"
//           type="file"
//           onChange={imageChange}
//         />

//         {selectedImage && (
//           <div style={styles.preview}>
//             <img
//               src={URL.createObjectURL(selectedImage)}
//               style={styles.image}
//               alt="Thumb"
//             />
//             <button onClick={removeSelectedImage} style={styles.delete}>
//               Remove This Image
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AddCategory;

// // Just some styles
// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 50,
//   },
//   preview: {
//     marginTop: 50,
//     display: "flex",
//     flexDirection: "column",
//   },
//   image: { maxWidth: "100%", maxHeight: 320 },
//   delete: {
//     cursor: "pointer",
//     padding: 15,
//     background: "red",
//     color: "white",
//     border: "none",
//   },
// };













// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';

// const Input = styled('input')({
//   display: 'none',
// });

// export default function AddCategory() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <label htmlFor="contained-button-file">
//         <Input accept="image/*" id="contained-button-file" multiple type="file" />
//         <Button variant="contained" component="span">
//           Upload
//         </Button>
//       </label>
//     </Stack>
//   );
// }