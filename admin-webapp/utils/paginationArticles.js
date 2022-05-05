import firebase from "./firebase";
import { where } from "firebase/firestore";
import moment from "moment";
import { Box, Button, Stack, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import customStyles from "../styles/Articles.module.css";
import ConfirmDialog from "../components/confirmDialog"
import {useState} from "react"


export async function getArticlesData(pageIndex, pageSize = 5, currentPage = 1) {
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
    statusData[data.id] = data.name;
  });

  const articles = await firebase.pagination(
    "articles",
    where("is_delete", "==", false),
    pageIndex,
    pageSize,
    currentPage
  );
  const articlesData = articles.data.map((article) => ({
    ...article,
    id: article.id,
    status: statusData[article.status],
    categories: article.categories.map((id) => {
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
      <Chip key={label} label={label} style={{ background: "#FFF6ED", color: "#C4320A" }} />
    );
  });
};

const CreateStatus = ({ label }) => {
  return <Chip key={label} label={label} style={{ background: "#F2F4F7", color: "#344054" }} />
};

const CreateAction = ({ id, handleOnEdit, handleOnDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return <>
  <Stack direction="row" alignItems="center">
    <IconButton aria-label="edit" size="small" onClick={() => handleOnEdit(id)} >
      <DriveFileRenameOutlineIcon />
    </IconButton>

    <div>
      <IconButton aria-label="delete" size="small" onClick={() =>     setConfirmOpen(true)}>
        <DeleteIcon />
      </IconButton>
      
      <ConfirmDialog
        title="Delete Post?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleOnDelete}
        id={id}
      >
        Are you sure you want to delete this post?
      </ConfirmDialog>
    </div>
  </Stack>
  </>
};

// const handleOnEdit = (id) => {
//   console.log(id)
// }

// const handleOnDelete = async (id) => {
//   console.log(id)
//   // await firebase.softDelete("articles", id);
// }

export const createRowsArticles = (articles, handleOnEdit, handleOnDelete) => {
  return articles.map((article, i) => {
    const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
    return createData(
          i + 1,
          <CreateImg src={article.image} alt={article.title} />,
          article.title,
          article.description,
          <CreateCategory labels={article.categories} />,
          dateTime,
          <CreateStatus label={article.status} />,
          <CreateAction id={article.id} handleOnEdit={handleOnEdit} handleOnDelete={handleOnDelete}/>
        );
  })
  // return articles.map((article, i) => {
  //   const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
  //   return createData(
  //     i + 1,
  //     <CreateImg src={article.image} alt={article.title} />,
  //     article.title,
  //     article.description,
  //     <CreateCategory labels={article.categories} />,
  //     dateTime,
  //     <CreateStatus label={article.status} />,
  //     <CreateAction id={article.id} />
  //   );
  // });
}