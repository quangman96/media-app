import { Box, Paper, Button, Stack, IconButton, Chip } from "@mui/material";
import CustomTable from "./../components/table";
import Input from "./../components/input";
import customStyles from "../styles/Articles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import firebase from "../utils/firebase";
import { where } from "firebase/firestore/lite";
import moment from "moment";
function createData(
  no,
  image,
  title,
  description,
  category,
  date,
  status,
  action
) {
  return {
    no,
    image,
    title,
    description,
    category,
    date,
    status,
    action
  };
}

const chips = {
  sport: (
    <Chip label="Sport" style={{ background: "#F9F5FF", color: "#6941C6" }} />
  ),
  family: (
    <Chip label="Family" style={{ background: "#ECFDF3", color: "#027A48" }} />
  ),
  travel: (
    <Chip label="Travel" style={{ background: "#EFF8FF", color: "#175CD3" }} />
  ),
  politics: (
    <Chip
      label="Politics"
      style={{ background: "#F2F4F7", color: "#344054" }}
    />
  ),
  entertainment: (
    <Chip
      label="Entertainment"
      style={{ background: "#FFF6ED", color: "#C4320A" }}
    />
  ),
  draft: (
    <Chip label="Draft" style={{ background: "#F2F4F7", color: "#344054" }} />
  ),
  close: (
    <Chip label="Close" style={{ background: "#F0F9FF", color: "#026AA2" }} />
  ),
  open: (
    <Chip label="Open" style={{ background: "#ECFDF3", color: "#027A48" }} />
  )
};

// const rows = [
//   createData("1", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("2", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['family'], "2022/04/14 15:15:15", chips['close'], action),
//   createData("3", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['travel'], "2022/04/14 15:15:15", chips['open'], action),
//   createData("4", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['politics'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("5", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['entertainment'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("6", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("7", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("8", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("9", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("10", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("11", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("12", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("13", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("14", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("15", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("16", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("17", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
//   createData("18", img, "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,", chips['sport'], "2022/04/14 15:15:15", chips['draft'], action),
// ];

const align = [
  "left",
  "left",
  "left",
  "left",
  "center",
  "left",
  "center",
  "left"
];

const headCells = [
  "No",
  "Image",
  "Title",
  "Description",
  "Category",
  "Date",
  "Status",
  "Action"
];

const ButtonSearch = (
  <Button
    variant="contained"
    style={{
      width: "10%",
      marginLeft: "3%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<SearchIcon />}
  >
    Search
  </Button>
);

const ButtonAdd = () => (
  <Button
    variant="contained"
    style={{
      width: "10%",
      marginLeft: "2.5%",
      borderRadius: "6px",
      background: "#51CBFF"
    }}
    endIcon={<AddBoxIcon />}
  >
    Create
  </Button>
);

// const img = (
//   <img
//     src="http://dulichbinhdinh.com.vn/uploads/news/2021_07/img_3919.jpg"
//     alt="hello"
//     width="50"
//     height="100%"
//     className={customStyles['td-img']}
//   />
// );

const CreateImg = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      width="50"
      height="100%"
      className={customStyles["td-img"]}
    />
  );
};

const CreateCategory = ({ labels }) => {
  return labels.map((label) => {
    return (
      <Chip key={label} label={label} style={{ background: "#F9F5FF", color: "#6941C6" }} />
    );
  });
};

const CreateStatus = ({ label }) => {
  return <Chip key={label} label={label} style={{ background: "#F9F5FF", color: "#6941C6" }} />
};

const CreateAction = ({ id }) => {
  return <>
  <Stack direction="row" alignItems="center">
    <IconButton aria-label="edit" size="small" onClick={() => handleOnEdit(id)} >
      <DriveFileRenameOutlineIcon />
    </IconButton>

    <IconButton aria-label="delete" size="small" onClick={() => handleOnDelete(id)} >
      <DeleteIcon />
    </IconButton>
  </Stack>
  </>
};

const handleOnEdit = (id) => {
  console.log(id)
}

const handleOnDelete = (id) => {
  console.log(id)
}

export default function Articles({ articles, test}) {
  console.log(articles);
  console.log(test);



  const rows = articles.map((article, i) => {
    const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
    return createData(
      i + 1,
      <CreateImg src={article.image} alt={article.title} />,
      article.title,
      article.description,
      <CreateCategory labels={article.category_id} />,
      dateTime,
      <CreateStatus label={article.status} />,
      <CreateAction id={article.id} />
    );
  });

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Paper
          className={customStyles["pd-1"]}
          sx={{
            width: "100%",
            mb: 2,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Box sx={{ mt: -3, width: 1 }}>
            <Input
              className={customStyles["pd-input"]}
              placeHolder="Search"
              button={ButtonSearch}
              positionAdornment="start"
              icon={<SearchIcon sx={{ color: "#979797" }} />}
            />
          </Box>
          <ButtonAdd />
        </Paper>
      </Box>

      <Box sx={{ width: "100%", mt: 4 }}>
        <CustomTable
          rows={rows}
          align={align}
          headCells={headCells}
          tb={customStyles["tb"]}
        />
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  let categoriesData = {};
  const categories = await firebase.getAll("categories");
  categories.forEach((data) => {
    categoriesData[data.id] = data.name;
  });

  let statusData = {};
  const masterData = await firebase.getByQuery(
    "master_data",
    where("class", "==", "ARTICLES_STATUS")
  );
  masterData.forEach((data) => {
    statusData[data.id] = data.code;
  });

  // const articles = await firebase.getAll("articles");
  const articles = await firebase.getByQuery(
    "articles",
    where("is_delete", "==", false)
  );
  const articlesData = articles.map((article) => ({
    ...article,
    id: article.id,
    status: statusData[article.status],
    category_id: article.category_id.map((id) => {
      return categoriesData[id]
    })
  }));

  const test1 = await firebase.getByQuery(
    "articles",
    where("is_delete", "==", false)
  );
  const test2 = test1.map((article) => ({
    ...article,
    id: article.id
  }));

  return {
    props: {
      articles: articlesData,
      test: test2
    }
  };
}
