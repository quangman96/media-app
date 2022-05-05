import { Box, Paper, Button, Stack, IconButton, Chip } from "@mui/material";
import CustomTable from "./../components/table";
import Input from "./../components/input";
import customStyles from "../styles/Articles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import firebase from "../utils/firebase";
import { getArticlesData, createRowsArticles } from "../utils/paginationArticles"
import { useState, useEffect } from "react"

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

export default function Articles({ articles, pagination, test }) {
  console.log("aaaaaaaaa")
const [rows, setRows] = useState("");
const [paginationData, setPaginationData] = useState(pagination);

  useEffect(async () => {
    setRows(await createRowsArticles(articles, handleOnEdit, handleOnDelete))
    console.log(articles)
  }, []);

  const handleOnEdit = async (id) => {
    console.log(id)
  }
  
  const handleOnDelete = async (id) => {
    setPaginationData(paginationData)
    await firebase.softDelete("articles", id);
    const data = await getArticlesData(paginationData.currentPage, paginationData.pageSize, paginationData.currentPage)
    const articles = data.articles
    const pagination = data.pagination
    console.log(pagination)
    const rows = await createRowsArticles(articles, handleOnEdit, handleOnDelete)
    setRows(rows);
  }

  const handleOnPagination = async (data) => {
    setPaginationData(data)
    const results = await (await getArticlesData((data.currentPage - 1) * data.pageSize, data.pageSize, data.currentPage)).articles
    const rows = await createRowsArticles(results, handleOnEdit, handleOnDelete)
    setRows(rows);
  }

  return (
    <Box>
      {rows ? <>
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
            pagination={paginationData}
            handleOnPagination={handleOnPagination}
          />
        </Box>
      </> : <div>loading...</div>}
    </Box>
  );
}

export async function getStaticProps() {
  const data = await getArticlesData(0)
  return {
    props: {
      articles: data.articles,
      pagination: data.pagination
    }
  };
}
