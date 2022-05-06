import { Box, Paper, Button, Stack, IconButton, Chip } from "@mui/material";
import CustomTable from "../../components/table";
import Input from "../../components/input";
import customStyles from "../../styles/Categories.module.css"
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import firebase from "../../utils/firebase";
import { getArticlesData, createRowsArticles } from "../../utils/paginationData"
import { useState, useEffect } from "react"
import Link from "next/link";
import { linksInfo } from '../../components/linksInfo';

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
  <Link href={linksInfo[1].path} passHref>
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
  </Link>
);

export default function Articles({ articles, pagination }) {
  const [rows, setRows] = useState("");
  const [paginationData, setPaginationData] = useState(pagination);

  useEffect(async () => {
    setRows(await createRowsArticles(articles, handleOnEdit, handleOnDelete, paginationData))
  }, []);

  const handleOnEdit = async (id) => {
    console.log(id)
  }

  const handleOnDelete = async (id, newPagination) => {
    await firebase.softDelete("articles", id);
    const data = await getArticlesData(newPagination.currentPage - 1, newPagination.pageSize, newPagination.currentPage)
    setPaginationData(data.pagination)
    const rows = await createRowsArticles(data.articles, handleOnEdit, handleOnDelete, newPagination)
    setRows(rows);
  }

  const handleOnPagination = async (data) => {
    setPaginationData(data)
    const results = await (await getArticlesData((data.currentPage - 1) * data.pageSize, data.pageSize, data.currentPage)).articles
    const rows = await createRowsArticles(results, handleOnEdit, handleOnDelete, data)
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

export async function getServerSideProps() {
  const data = await getArticlesData(0);
  return {
    props: {
      articles: data.articles,
      pagination: data.pagination
    }
  };
}
