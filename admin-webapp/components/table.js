import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Stack,
  Pagination,
  Typography,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#d55ae0",
      contrastText: "#fff",
    },
  },
});
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells, align } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell}
            align={align[i]}
            padding="normal"
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function CustomTable({ rows, align, headCells, tb }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("No");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnChange = (event) => {
    if (!event.target.validity.valid || event.target.value === '') event.target.value = 1;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
          className={tb}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
            align={align}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `custom-table-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.no}>
                    {Object.entries(row).map(([k, v], i) => (
                      <TableCell
                        key={i}
                        align={align[i]}
                        style={{ paddingTop: "8px", paddingBottom: "8px" }}
                      >
                        {v}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}

            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{pt: '0.5%', pb: '0.5%'}}>
        <Typography
          style={{ marginLeft: "17px", fontSize: "15px", color: "#6C757D" }}
        >
          Showing 1 to 5 of 50 entries
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="end" sx={{mr: '17px'}}>
          <Typography style={{ fontSize: "15px", color: "#6C757D" }}>
            Display
          </Typography>
          <Box sx={{width: '15%'}}>
          <TextField id="outlined-number" type="number" defaultValue="5" InputProps={{ inputProps: { min: 1} }} sx={{p: ' 5px 10px', '& fieldset': {
              padding: '6px',
            }, '& .MuiInputBase-input': {
              padding: '5px 10px'
            }, '& ::-webkit-inner-spin-button': {
              opacity: 1
          } }} onChange={handleOnChange}/>
          </Box>
          <Pagination
            count={210}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#51CBFF !important",
                color: "white",
              },
            }}
          />
        </Stack>

        {/* <ThemeProvider theme={theme}>
          <Pagination
            className="abc"
            count={210}
            shape="rounded"
            color="neutral"
          />
        </ThemeProvider> */}
      </Stack>
    </Paper>
  );
}
