import firebase from "./firebase";
import { where } from "firebase/firestore";
import moment from "moment";
import { Box, Button, Stack, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export async function getArticlesData(pageIndex, pageSize = 3) {
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

  const articles = await firebase.pagination(
    "articles",
    where("is_delete", "==", false),
    pageIndex,
    pageSize
  );
  const articlesData = articles.data.map((article) => ({
    ...article,
    id: article.id,
    status: statusData[article.status],
    category_id: article.category_id.map((id) => {
      return categoriesData[id];
    }),
  }));

  return {
    articles: articlesData,
    pagination: articles.pagination,
  };
}

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

export const createRowsArticles = (articles) => {
  console.log("======================================================")
  return articles.map((article, i) => {
    const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
    return createData(
          i + 1,
          // <CreateImg src={article.image} alt={article.title} />,
          "",
          article.title,
          article.description,
          "",
          // <CreateCategory labels={article.category_id} />,
          dateTime,
          "",
          // <CreateStatus label={article.status} />,
          <CreateAction id={article.id} />
        );
  })
  // return articles.map((article, i) => {
  //   const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
  //   return createData(
  //     i + 1,
  //     <CreateImg src={article.image} alt={article.title} />,
  //     article.title,
  //     article.description,
  //     <CreateCategory labels={article.category_id} />,
  //     dateTime,
  //     <CreateStatus label={article.status} />,
  //     <CreateAction id={article.id} />
  //   );
  // });
}