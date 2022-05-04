import Input from "../components/input";
import {
  Box,
  Button,
  Paper,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  TextareaAutosize
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
import DropDown from "../components/dropdown";
import ImgDialog from "../components/imgDialog";
import TextEditor from "../components/textEditor";
import TextArea from "../components/textArea";
import firebase from "../utils/firebase";
import MultipleSelectChip from "../components/multipleSelectChip";
import { where } from "firebase/firestore/lite";

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
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: [categoryData[0].value],
    status: statusData[0].value,
    image: "",
    content: ""
  });
  const [reset, setReset] = useState(false);

  const handleAfterUploadImg = async (downloadURL) => {
    const time = new Date().getTime();
    const data = {
      category_id: form.category,
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
      user_id: "yWgyHYLBxw0R0FnP31Qf"
    };
    await firebase.create("articles", data);
    setForm({
      title: "",
      description: "",
      category: "",
      status: "",
      image: "",
      content: ""
    });
    setReset(true);
  };

  const handleSetReset = (value) => {
    setReset(value);
  };

  const handleOnCreate = () => {
    firebase.uploadImg(form.image, handleAfterUploadImg);
  };

  const handleOnChange = (value, keyObj) => {
    setForm({ ...form, [keyObj]: value });
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
                    minRows="8"
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
                    keyObj={"category"}
                    data={categoryData}
                    reset={reset}
                    handleSetReset={handleSetReset}
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
            <Box style={{ width: "50%", paddingLeft: "1%" }}>
              <ImgDialog
                onChangeEvent={handleOnChange}
                keyObj={"image"}
                reset={reset}
                handleSetReset={handleSetReset}
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
            />
          </Box>

          <Stack direction="row" justifyContent="end">
            <Button
              variant="contained"
              style={{
                width: "10%",
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
    </Paper>
  );
}

export async function getStaticProps() {
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
    text: data["code"],
    value: data.id
  }));
  return {
    props: {
      categoryData: categoriesData,
      statusData: statusData
    }
  };
}
