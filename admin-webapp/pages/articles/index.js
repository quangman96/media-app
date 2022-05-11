import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Paper } from "@mui/material";
import { where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import DropDown from "../../components/dropdown";
import Input from "../../components/input";
import { linksInfo } from '../../components/linksInfo';
import CustomTable from "../../components/table";
import customStyles from '../../styles/Articles.module.css';
import firebase from "../../utils/firebase";
import { createRowsArticles, getArticlesData } from "../../utils/paginationData";

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

const formatData = async (filtedData) => {
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

  const articlesData = filtedData.map((article) => ({
    ...article,
    id: article.id,
    status: statusData[article.status],
    categories: article.categories.map((id) => {
      return categoriesData[id];
    }),
  }));

  return articlesData;
}

const customSearch = async (data) => {
 return await formatData(data)
}

const searchByData = [
  {text: 'Title', value: 0, field: 'title'}, 
  {text: 'Description', value: 1, field: 'description'}, 
  {text: 'Category', value: 2, field: 'categories', function: customSearch}, 
  {text: 'Status', value: 3, field: 'status', function: customSearch}, 
  {text: 'All', value: 4, field: 'all', function: customSearch}
]

export default function Articles({ articles, pagination }) {
  const [rows, setRows] = useState("");
  const [paginationData, setPaginationData] = useState(pagination);
  const [searchBy, setSearchBy] = useState(searchByData[0].value);
  const [searchValue, setSearchValue] = useState('');

  useEffect(async () => {
    setRows(await createRowsArticles(articles, handleOnDelete, paginationData))
  }, []);

  const handleOnSearch = async () => {
    const filted = await firebase.search("articles", searchByData[searchBy].field, searchValue, paginationData.pageSize, paginationData.currentPage, searchByData[searchBy].function)
    setPaginationData(filted.pagination);

    if(filted['formated']){
      setRows(await createRowsArticles(filted['data'], handleOnDelete, filted.pagination))
    } else {
      const articlesData = await formatData(filted.data);
      setRows(await createRowsArticles(articlesData, handleOnDelete, filted.pagination))
    }
  }

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
      onClick={handleOnSearch}
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

  const handleOnDelete = async (id, newPagination) => {
    await firebase.softDelete("articles", id);
    const data = await getArticlesData((newPagination.currentPage - 1) * newPagination.pageSize, newPagination.pageSize, newPagination.currentPage)
    setPaginationData(data.pagination)
    const rows = await createRowsArticles(data.articles, handleOnDelete, newPagination)
    setRows(rows);
  }

  const handleOnPagination = async (data) => {
    setPaginationData(data)
    const results = await (await getArticlesData((data.currentPage - 1) * data.pageSize, data.pageSize, data.currentPage)).articles
    const rows = await createRowsArticles(results, handleOnDelete, data)
    setRows(rows);
  }

  const handleOnChange = (e) => {
    setSearchBy(e);
  }

  const handleOnInputSearch = (value) => {
    setSearchValue(value)
  }

  return (
    <Box>
      {rows ? <>
        <Box sx={{ width: "100%" }}>
          <Paper
            className={`${customStyles["pd-1"]} search-container`}
            sx={{
              width: "100%",
              mb: 2,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ mt: -3, width: 1, display: 'flex' }}>
            <DropDown
                className='search-by-data'
                onChangeEvent={handleOnChange}
                data={searchByData}
                sxBox={{width: '10%', marginRight: '1%'}}
                sxSelect={{
                  "& .MuiSelect-select": {
                    padding: "6%"
                  }
              }}
              />
              <Input
                className={customStyles["pd-input"]}
                placeHolder="Search"
                button={ButtonSearch}
                positionAdornment="start"
                onChangeEvent={handleOnInputSearch}
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