import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {
  Box,
  Button, Grid, Paper, Stack
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { where } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import DropDown from "../../components/dropdown";
import ImgDialog from "../../components/imgDialog";
import Input from "../../components/input";
import { linksInfo } from '../../components/linksInfo';
import MultipleSelectChip from "../../components/multipleSelectChip";
import TextArea from "../../components/textArea";
import TextEditor from "../../components/textEditor";
import firebase from "../../utils/firebase";

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

export default function EditArticle({ categoryData, statusData, articlesData, categoriesDataSelected, statusDataSelected, articleId }) {
  const [form, setForm] = useState({
    title: articlesData.title,
    description: articlesData.description,
    categories: articlesData.categories,
    status: articlesData.status,
    image: articlesData.image,
    content: articlesData.content
  });
  const [reset, setReset] = useState(false);
  const router = useRouter();
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

  useEffect(()=> {
    setWindowWidth(window.innerWidth);
 }, [])

  const handleAfterUploadImg = async (downloadURL) => {
    const time = new Date().getTime();
    const data = {
      categories: form.categories,
      change_at: time,
      change_by: "admin",
      title: form.title,
      description: form.description,
      content: form.content,
      image: downloadURL,
      status: form.status,
    };
    await firebase.updateById("articles", data, articleId);
    router.push(linksInfo[0].path);
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  const handleOnEdit = () => {
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
      id='edit-article'
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
                    maxRows={windowWidth <= 1366 ? 4 : 8}
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
                    selected={categoriesDataSelected}
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
                    selected={statusDataSelected}
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
              content={form.content}
            />
          </Box>

          <Stack direction="row" justifyContent="end">
            <Button
              id='submit-btn'
              variant="contained"
              style={{
                // width: "10%",
                width: "40%",
                borderRadius: "6px",
                background: "#51CBFF"
              }}
              endIcon={<DriveFileRenameOutlineIcon sx={{ fontSize: 100 }} />}
              onClick={handleOnEdit}
            >
              Edit
            </Button>
          </Stack>
        </Box>
      </form>
    </Paper>
  );
}

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const articlesData = await firebase.getById("articles", params.id)

  const categoriesDataSelected = [];
  const categories = await firebase.getAll("categories");
  const categoriesData = categories.map((category) => {
    if (articlesData.categories.includes(category.id)) {
      categoriesDataSelected.push({
        text: category["name"],
        value: category.id
      })
    }
    return {
      text: category["name"],
      value: category.id
    };
  });

  const masterData = await firebase.getByQuery(
    "master_data",
    where("class", "==", "ARTICLES_STATUS")
  );
  let statusDataSelected = {};
  const statusData = masterData.map((data) => {
    if (articlesData.status === data.id) {
      statusDataSelected = {
        text: data["name"],
        value: data.id
      }
    }
    return {
      text: data["name"],
      value: data.id
    }
  });

  return {
    props: {
      categoryData: categoriesData,
      statusData: statusData,
      articlesData: articlesData,
      categoriesDataSelected: categoriesDataSelected,
      statusDataSelected: statusDataSelected,
      articleId: params.id
    }
  };
}
