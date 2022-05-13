import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Box,
  Button, Grid, Paper, Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { where } from "firebase/firestore";
import { useState, useEffect } from "react";
import DropDown from "../components/dropdown";
import ImgDialog from "../components/imgDialog";
import Input from "../components/input";
import MultipleSelectChip from "../components/multipleSelectChip";
import TextArea from "../components/textArea";
import TextEditor from "../components/textEditor";
import firebase from "../utils/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const commonStyles = {
  bgcolor: "background.paper",
  border: 1,
  width: "5rem",
  height: "5rem"
};

export default function AddArticle({ categoryData, statusData }) {
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fimage.png?alt=media&token=2230ed0c-035a-4b66-a043-25052dc563ab"
  const [form, setForm] = useState({
    title: "",
    description: "",
    categories: [categoryData[0].value],
    status: statusData[0].value,
    image: defaultImg,
    content: ""
  });
  const [reset, setReset] = useState(false);
  const [windowWidth, setWindowWidth] = useState('');
  const [customError, setCustomError] = useState({
    title: {
      error: false,
      msg: ''
    },
    categories: {
      error: false,
      msg: ''
    }
  });
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(()=> {
    setWindowWidth(window.innerWidth);
 }, [])

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const handleAfterUploadImg = async (downloadURL) => {
    const time = new Date().getTime();
    const data = {
      categories: form.categories,
      change_at: time,
      change_by: "admin",
      create_at: time,
      create_by: "admin",
      title: form.title,
      description: form.description,
      content: form.content,
      image: downloadURL,
      is_delete: false,
      sort_no: "",
      status: form.status,
      user_id: localStorage.getItem('userId')
    };
    await firebase.create("articles", data);
    setForm({
      title: "",
      description: "",
      categories: [categoryData[0].value],
      status: statusData[0].value,
      image: defaultImg,
      content: ""
    });
    setReset(true);
    handleCloseBackdrop();
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  const handleOnCreate = () => {
    const errors = {};
    if(!form.title)
      errors["title"] = {
          error: true,
          msg: 'Title is required'
      }
    else {
      errors["title"] = {
        error: false,
        msg: ''
      }
    }

    if(!form.categories || form.categories.length == 0)
      errors["categories"] = {
          error: true,
          msg: 'Pick at least 1 category'
      }
    else {
      errors["categories"] = {
        error: false,
        msg: ''
      }
    }

    setCustomError({...customError, ...errors});
    if(Object.values(errors).some(child => Object.values(child).includes(true)))
      return false;

    handleToggleBackdrop()
    if(form.image instanceof File)
      firebase.uploadImg(form.image, handleAfterUploadImg);
    else
      handleAfterUploadImg(form.image)
  };

  const handleOnChange = (value, keyObj) => {
    setForm({ ...form, [keyObj]: value });
  };
  return (
    <Paper
      id="add-article"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      {/* <form style={{ height: "100%", padding: "2%" }}> */}
      <form style={{ height: "100%", padding: "5%" }}>
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
          <Box
            className="box-left"
            style={{
              display: "flex",
              // flexDirection: "row",
              flexDirection: "column",
              // height: "100%"
              height: "fit-content"
            }}
          >
            {/* <Box style={{ width: "50%", paddingRight: "1%" }}> */}
            <Box style={{ width: "100%", paddingRight: "1%" }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
              >
                <Grid item xs={12}>
                  <Input
                    label="Title"
                    placeHolder="Input text"
                    onChangeEvent={handleOnChange}
                    keyObj={"title"}
                    value={form.title}
                    errors={customError['title']['msg']}
                    validate={customError['title']['error']}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextArea
                    label="Description"
                    placeHolder="Enter a description..."
                    maxRows={windowWidth <= 1366 ? 5 : 8}
                    style={{
                      width: "100%",
                      resize: "none",
                      overflow: "auto",
                      borderRadius: "6px"
                    }}
                    onChangeEvent={handleOnChange}
                    keyObj={"description"}
                    value={form.description}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1.5%"
                  }}
                >
                  <MultipleSelectChip
                    label="Category"
                    width="72%"
                    onChangeEvent={handleOnChange}
                    keyObj={"categories"}
                    data={categoryData}
                    reset={reset}
                    handleSetReset={handleSetReset}
                    errors={customError['categories']['msg']}
                    validate={customError['categories']['error']}
                  />
                  {/* <DropDown
                    label="Category"
                    width="72%"
                    onChangeEvent={handleOnChange}
                    keyObj={"category"}
                  /> */}

                  <DropDown
                    label="Status"
                    width="20%"
                    onChangeEvent={handleOnChange}
                    keyObj={"status"}
                    data={statusData}
                    reset={reset}
                    handleSetReset={handleSetReset}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* <Box style={{ width: "50%", paddingLeft: "1%" }}> */}
            <Box className="box-right" style={{ width: "100%", marginTop: "5%" }}>
              <ImgDialog
                onChangeEvent={handleOnChange}
                keyObj={"image"}
                reset={reset}
                handleSetReset={handleSetReset}
                defaultImg={form.image}
              />
            </Box>
          </Box>

          {/* <Box sx={{ marginTop: "1.2%", marginBottom: "1%" }}> */}
          <Box sx={{ marginTop: "5%", marginBottom: "5%", height: "100%" }}>
            <TextEditor
              // style={{ height: "27vh" }}
              style={{ height: "100%" }}
              onChangeEvent={handleOnChange}
              keyObj={"content"}
              reset={reset}
              handleSetReset={handleSetReset}
            />
          </Box>

          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              style={{
                // width: "10%",
                width: "40%",
                borderRadius: "6px",
                background: "#51CBFF"
              }}
              endIcon={<AddBoxIcon />}
              onClick={handleOnCreate}
            >
              Create
            </Button>
          </Stack>
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

export async function getServerSideProps() {
  const categories = await firebase.getAll("categories");
  const categoriesData = categories.map((category) => ({
    text: category["name"],
    value: category.id
  }));

  const masterData = await firebase.getByQuery(
    "master_data",
    where("class", "==", "ARTICLES_STATUS")
  );

  const statusData = masterData.map((data) => ({
    text: data["name"],
    value: data.id
  }));

  return {
    props: {
      categoryData: categoriesData,
      statusData: statusData,
    }
  };
}
