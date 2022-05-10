import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Chip, IconButton, Stack } from "@mui/material";
import { where } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import ConfirmDialog from "../components/confirmDialog";
import customStyles from "../styles/Articles.module.css";
import { linksInfo } from './../components/linksInfo';
import firebase from "./firebase";

function createDataArticles(
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

const CreateCategory = ({ labels}) => {
  return labels.map((label, i) => {
    return (
      <Chip key={i} label={label} style={{ background: "#FFF6ED", color: "#C4320A" }} />
    );
  });
};

const CreateChip = ({ label, setFontSize }) => {
  return (
    setFontSize ? 
    <Chip key={label} label={label} style={{ background: "#FFF6ED", color: "#C4320A", fontSize: '15px' }} /> :
    <Chip key={label} label={label} style={{ background: "#F2F4F7", color: "#344054" }} />
  );
};

const CreateAction = ({ id, handleOnDelete, pagination, indexLink }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return <>
    <Stack direction="row" alignItems="center">
      <Link href={`${linksInfo[indexLink].path}/${id}`}>
        {/* <IconButton aria-label="edit" size="small" onClick={() => handleOnEdit(id)} > */}
        <IconButton aria-label="edit" size="small">
          <DriveFileRenameOutlineIcon />
        </IconButton>
      </Link>
      <div>
        <IconButton aria-label="delete" size="small" onClick={() => setConfirmOpen(true)}>
          <DeleteIcon />
        </IconButton>

        <ConfirmDialog
          title="Delete Post?"
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={handleOnDelete}
          id={id}
          pagination={pagination}
        >
          Are you sure you want to delete this post?
        </ConfirmDialog>
      </div>
    </Stack>
  </>
};

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

export const createRowsArticles = (articles, handleOnDelete, pagination) => {
  console.log(pagination)
  return articles.map((article, i) => {
    const dateTime = moment(article.change_at).format("YYYY/MM/DD HH:mm:ss");
    return createDataArticles(
      // i + 1,
      (pagination.pageSize * pagination.currentPage) - pagination.pageSize + i + 1,
      <CreateImg src={article.image} alt={article.title} />,
      article.title,
      article.description,
      <CreateCategory labels={article.categories} />,
      dateTime,
      <CreateChip label={article.status} />,
      <CreateAction id={article.id} handleOnDelete={handleOnDelete} pagination={pagination} indexLink="0" />
    );
  })
}

function createDataCategories(
  no,
  image,
  category,
  date,
  action
) {
  return {
    no,
    image,
    category,
    date,
    action
  };
}

export async function getCategoriesData(pageIndex, pageSize = 5, currentPage = 1) {
  const categories = await firebase.pagination(
    "categories",
    where("is_delete", "==", false),
    pageIndex,
    pageSize,
    currentPage
  );
  const categoriesData = categories.data.map((category) => ({
    ...category,
    id: category.id
  }));

  return {
    categories: categoriesData,
    pagination: categories.pagination,
  };
}

export const createRowsCategories = (categories, handleOnDelete, pagination) => {
  return categories.map((category, i) => {
    const dateTime = moment(category.change_at).format("YYYY/MM/DD HH:mm:ss");
    return createDataCategories(
      (pagination.pageSize * pagination.currentPage) - pagination.pageSize + i + 1,
      <CreateImg src={category.image} alt={category.name} />,
      <CreateChip label={category.name} setFontSize="true"/>,
      dateTime,
      <CreateAction id={category.id} handleOnDelete={handleOnDelete} pagination={pagination} indexLink="2" />
    );
  })
}