import { Box, Paper, Button, Stack, IconButton, Chip } from "@mui/material";
import CustomTable from "./../components/table";
import Input from "./../components/input";
import customStyles from "../styles/Categories.module.css";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function createData(
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
  
  const img = (
    <img
      src="http://dulichbinhdinh.com.vn/uploads/news/2021_07/img_3919.jpg"
      alt="hello"
      width="50"
      height="100%"
      className={customStyles['td-img']}
    />
  );
  
  const chips = {
      sport: <Chip label="Sport" style={{background: '#F9F5FF', color: '#6941C6', fontSize: '15px'}} />,
      family: <Chip label="Family" style={{background: '#ECFDF3', color: '#027A48', fontSize: '15px'}} />,
      travel: <Chip label="Travel" style={{background: '#EFF8FF', color: '#175CD3', fontSize: '15px'}} />,
      politics: <Chip label="Politics" style={{background: '#F2F4F7', color: '#344054', fontSize: '15px'}} />,
      entertainment: <Chip label="Entertainment" style={{background: '#FFF6ED', color: '#C4320A', fontSize: '15px'}} />
  };
  
  const action = (
    <Stack direction="row" alignItems="center">
    <IconButton aria-label="edit" size="small">
      <DriveFileRenameOutlineIcon />
    </IconButton>
  
    <IconButton aria-label="delete" size="small">
      <DeleteIcon />
    </IconButton>
  </Stack>
  )

  const rows = [
    createData("1", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("2", img, chips['family'], "2022/04/14 15:15:15", action),
    createData("3", img, chips['travel'], "2022/04/14 15:15:15", action),
    createData("4", img, chips['politics'], "2022/04/14 15:15:15", action),
    createData("5", img, chips['entertainment'], "2022/04/14 15:15:15", action),
    createData("6", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("7", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("8", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("9", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("10", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("11", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("12", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("13", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("14", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("15", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("16", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("17", img, chips['sport'], "2022/04/14 15:15:15", action),
    createData("18", img, chips['sport'], "2022/04/14 15:15:15", action),
  ];
  
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
      style={{ width: "10%", marginLeft: "3%", borderRadius: "6px", background: "#51CBFF"}}
      endIcon={<SearchIcon />}
    >
      Search
    </Button>
  );
  
  const ButtonAdd = (handleOnCreate) => <Button
      variant="contained"
      style={{ width: "10%", marginLeft: "2.5%", borderRadius: "6px", background: "#51CBFF" }}
      endIcon={<AddBoxIcon />}
      onClick={handleOnCreate}
    >
      Create
    </Button>;

export default function Catelogies() {
  const handleOnCreate = () => {
    console.log("handleOnCreate")
  }

  return (
    <Box>
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
        <CustomTable rows={rows} align={align} headCells={headCells} tb={customStyles['tb']} />
      </Box>
    </Box>
  );
}
