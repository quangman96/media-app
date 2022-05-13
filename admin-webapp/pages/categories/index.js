import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Paper } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDown from "../../components/dropdown";
import Input from "../../components/input";
import { linksInfo } from "../../components/linksInfo";
import CustomTable from "../../components/table";
import customStyles from "../../styles/Categories.module.css";
import firebase from "../../utils/firebase";
import {
  createRowsCategories,
  getCategoriesData,
} from "../../utils/paginationData";
import { where, orderBy } from "firebase/firestore";

const align = ["left", "left", "center", "left", "left"];

const headCells = ["No", "Image", "Category", "Date", "Action"];

const searchByData = [{ text: "Category", value: 0 }];

export default function Catelogies({ categories, pagination }) {
  const [rows, setRows] = useState("");
  const [paginationData, setPaginationData] = useState(pagination);
  const [searchBy, setSearchBy] = useState(searchByData[0].value);
  const [searchValue, setSearchValue] = useState("");

  useEffect(async () => {
    setRows(
      await createRowsCategories(categories, handleOnDelete, paginationData)
    );
  }, []);

  const handleOnSearch = async (e, data) => {
    const value = data && data != undefined ? data : paginationData;
    const filted = await firebase.search(
      "categories",
      "name",
      searchValue,
      value.pageSize,
      value.currentPage
    );
    setPaginationData(filted.pagination);
    setRows(
      await createRowsCategories(filted.data, handleOnDelete, filted.pagination)
    );
  };

  const ButtonSearch = () => (
    <Button
      id="btn-search"
      variant="contained"
      style={{
        width: "100%",
        borderRadius: "6px",
        background: "#51CBFF",
      }}
      endIcon={<SearchIcon />}
      onClick={handleOnSearch}
    >
      Search
    </Button>
  );

  const ButtonAdd = () => (
    <Link href={linksInfo[3].path}>
      <Button
        id="btn-add-edit"
        variant="contained"
        style={{
          width: "100%",
          borderRadius: "6px",
          background: "#51CBFF",
        }}
        endIcon={<AddBoxIcon />}
        // onClick={handleOnCreate}
      >
        Create
      </Button>
    </Link>
  );

  const handleOnDelete = async (id, currentPagination) => {
    await firebase.softDelete("categories", id);
    const data = await getCategoriesData(
      (currentPagination.currentPage - 1) * currentPagination.pageSize,
      currentPagination.pageSize,
      currentPagination.currentPage
    );
    setPaginationData(data.pagination);
    const rows = await createRowsCategories(
      data.categories,
      handleOnDelete,
      currentPagination
    );
    setRows(rows);
  };

  const handleOnPagination = async (data) => {
    if (searchValue) {
      await handleOnSearch(null, data);
    } else {
      setPaginationData(data);
      const results = await (
        await getCategoriesData(
          (data.currentPage - 1) * data.pageSize,
          data.pageSize,
          data.currentPage
        )
      ).categories;
      const rows = await createRowsCategories(results, handleOnDelete, data);
      setRows(rows);
    }
  };

  const handleOnSort = async (orderBy, order) => {
    const field = (orderBy) => {
      switch (orderBy) {
        case "No":
          return "create_at";
        case "Category":
          return "name";
        case "Date":
          return "change_at";
      }
    };

    const results = (
      await getCategoriesData(
        (paginationData.currentPage - 1) * paginationData.pageSize,
        paginationData.pageSize,
        paginationData.currentPage,
        { orderBy: field(orderBy), order: order }
      )
    ).categories;
    const rows = await createRowsCategories(
      results,
      handleOnDelete,
      paginationData
    );
    setRows(rows);
  };

  const handleOnChange = (e) => {
    setSearchBy(e);
  };

  const handleOnInputSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <Box id="categories-page">
      {rows ? (
        <>
          <Box className="search-area" sx={{ width: "100%" }}>
            <Paper
              className={`${customStyles["pd-1"]} search-container`}
              sx={{
                width: "100%",
                mb: 2,
                mt: 2.2
                // display: "flex",
                // justifyContent: "space-between",
              }}
            >
              {/* <Box sx={{ width: 1, display: "flex" }}> */}
              <Box sx={{width: 1, display: "flex", flexDirection: "column", p: "2%" }}>
                <DropDown
                  className="search-by-data"
                  onChangeEvent={handleOnChange}
                  data={searchByData}
                  // sxBox={{ width: "10%", marginRight: "1%" }}
                  sxBox={{ width: "100%"}}
                  sxSelect={{
                    "& .MuiSelect-select": {
                      // padding: "6%",
                      padding: "2%",
                    },
                  }}
                />
                <Input
                  className={customStyles["pd-input"]}
                  placeHolder="Search"
                  onChangeEvent={handleOnInputSearch}
                  positionAdornment="start"
                  icon={<SearchIcon sx={{ color: "#979797" }} />}
                />

              {/* <Box sx={{width: "25%", display: "flex", columnGap: "12%", marginLeft: "2%", marginRight: "1%" }}> */}
              <Box sx={{width: "100%", display: "flex", columnGap: "12%", marginTop: "3%"}}>
                  <ButtonSearch />
                  <ButtonAdd />
                </Box>
              </Box>
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
              handleOnSort={handleOnSort}
            />
          </Box>
        </>
      ) : (
        <div>loading...</div>
      )}
    </Box>
  );
}

export async function getServerSideProps() {
  const data = await getCategoriesData(0);
  return {
    props: {
      categories: data.categories,
      pagination: data.pagination,
    },
  };
}
