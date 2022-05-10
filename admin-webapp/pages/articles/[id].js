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
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fimage.png?alt=media&token=2230ed0c-035a-4b66-a043-25052dc563ab"
  const [form, setForm] = useState({
    title: articlesData.title,
    description: articlesData.description,
    categories: ['HeBLNFWCJRLlloWauH4o'],
    status: articlesData.status,
    image: articlesData.image,
    content: articlesData.content
  });
  const [reset, setReset] = useState(false);
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState('');

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
    if (form.image instanceof File)
      firebase.uploadImg(form.image, handleAfterUploadImg);
    else
      handleAfterUploadImg(form.image)
  };

  const handleOnChange = (value, keyObj) => {
    setForm({ ...form, [keyObj]: value });
  };
  return (
    <Paper
      className='edit-article'
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
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%"
            }}
          >
            <Box style={{ width: "50%", paddingRight: "1%" }}>
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
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextArea
                    label="Description"
                    placeHolder="Enter a description..."
                    maxRows={windowWidth <= 1366 ? 6 : 8}
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
            <Box style={{ width: "50%", paddingLeft: "1%" }}>
              <ImgDialog
                onChangeEvent={handleOnChange}
                keyObj={"image"}
                reset={reset}
                handleSetReset={handleSetReset}
                defaultImg={form.image}
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: "1.2%", marginBottom: "1%" }}>
            <TextEditor
              style={{ height: "27vh" }}
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
                width: "10%",
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
