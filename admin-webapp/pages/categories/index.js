import { Box, Paper, Button, Stack, IconButton, Chip } from "@mui/material";
import CustomTable from "../../components/table";
import Input from "../../components/input";
import customStyles from "../../styles/Categories.module.css"
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { getCategoriesData, createRowsCategories } from '../../utils/paginationData'
import { useState, useEffect } from 'react'
import firebase from "../../utils/firebase";
import Link from "next/link";
import { linksInfo } from '../../components/linksInfo';

const align = [
  "left",
  "left",
  "center",
  "left",
  "left"
];

const headCells = [
  "No",
  "Image",
  "Category",
  "Date",
  "Action"
];

const ButtonSearch = (
  <Button
    variant="contained"
    style={{ width: "10%", marginLeft: "3%", borderRadius: "6px", background: "#51CBFF" }}
    endIcon={<SearchIcon />}
  >
    Search
  </Button>
);

const ButtonAdd = (handleOnCreate) => <Link href={linksInfo[3].path}>
  <Button
    variant="contained"
    style={{ width: "10%", marginLeft: "2.5%", borderRadius: "6px", background: "#51CBFF" }}
    endIcon={<AddBoxIcon />}
  // onClick={handleOnCreate}
  >
    Create
  </Button>
</Link>;

export default function Catelogies({ categories, pagination }) {
  const [rows, setRows] = useState("");
  const [paginationData, setPaginationData] = useState(pagination);
  useEffect(async () => {
    console.log("aa")
    setRows(await createRowsCategories(categories, handleOnEdit, handleOnDelete, paginationData))
  }, []);

  // useEffect(() => {
  //   console.log(paginationData)
  //   setPaginationData(paginationData);
  // }, [paginationData]);


  const handleOnEdit = async (id) => {
    console.log(id)
  }

  const handleOnDelete = async (id, currentPagination) => {
    await firebase.softDelete("categories", id);
    const data = await getCategoriesData(currentPagination.currentPage - 1, currentPagination.pageSize, currentPagination.currentPage)
    setPaginationData(data.pagination)
    const rows = await createRowsCategories(data.categories, handleOnEdit, handleOnDelete, currentPagination)
    setRows(rows);
  }

  const handleOnPagination = async (data) => {
    console.log(data)
    setPaginationData(data)
    const results = await (await getCategoriesData((data.currentPage - 1) * data.pageSize, data.pageSize, data.currentPage)).categories
    const rows = await createRowsCategories(results, handleOnEdit, handleOnDelete, data)
    setRows(rows);
  }

  const handleOnCreate = () => {
    console.log("handleOnCreate")
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
              justifyContent: "space-between",
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
  const data = await getCategoriesData(0);
  return {
    props: {
      categories: data.categories,
      pagination: data.pagination
    }
  };
}
