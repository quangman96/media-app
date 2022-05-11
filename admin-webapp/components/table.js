import {
  Box, Pagination, Paper,
  Stack, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TableRow,
  TableSortLabel, TextField, Typography
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useState } from "react";


const columnNotSort = ["Image", "Action"];

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
            {columnNotSort.toString().includes(headCell) ? headCell : <TableSortLabel
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
            </TableSortLabel>  }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable({ rows, align, headCells, tb, pagination, handleOnPagination, handleOnSort }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("No");
  const [rowsData, setRowsData] = useState(rows);
  const [paginationData, setPaginationData] = useState(pagination);

  useEffect(async () => {
    setRowsData(rows)
    setPaginationData(pagination)
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc"
    setOrder(newOrder);
    setOrderBy(property);
    if (typeof handleOnSort == 'function') { 
      handleOnSort(property, newOrder);
    }
  };

  const handleOnChangeMaxRow = async (event) => {
    if (!event.target.validity.valid || event.target.value === "")
      event.target.value = 1;

    const pageSize = parseInt(event.target.value);
    const totalPage = Math.ceil(pagination.itemsTotal / pageSize);
    const currentPage = totalPage < paginationData.currentPage ? 1 : paginationData.currentPage
    const data = { ...paginationData, pageTotal: totalPage, pageSize: pageSize, currentPage: currentPage }
    setPaginationData(data);
    handleOnPagination(data);
  };

  const handlePagination = async (e) => {
    const arrowBtn = e.target.getAttribute("aria-label");
    const arrowIcon = e.target.getAttribute("data-testid");
    const pageNumber = e.target.textContent;

    if (pageNumber || arrowIcon || arrowBtn) {
      const currentIndex = 1;
      if ((arrowIcon && arrowIcon === "NavigateBeforeIcon") || (arrowBtn && arrowBtn === "Go to previous page")) {
        currentIndex = parseInt(paginationData.currentPage) - 1;
      } else if ((arrowIcon && arrowIcon === "NavigateNextIcon") || (arrowBtn && arrowBtn === "Go to next page")) {
        currentIndex = parseInt(paginationData.currentPage) + 1;
      } else {
        currentIndex = parseInt(e.target.textContent);
      }

      const data = { ...paginationData, currentPage: currentIndex }
      setPaginationData(data)
      handleOnPagination(data);
    }
  }

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer style={{height: '68.5vh'}}>
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
            {rowsData.map((row, index) => {
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
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: "0.5%", pb: "0.5%" }}
      >
        <Typography
          style={{ marginLeft: "17px", fontSize: "15px", color: "#6C757D" }}
        >
          Showing {paginationData.itemsTotal == 0 ? 0 : ((paginationData.currentPage - 1) * paginationData.pageSize) + 1}&nbsp;
          to {paginationData.itemsTotal == 0 ? 0 : paginationData.currentPage === paginationData.pageTotal ? paginationData.itemsTotal : ((paginationData.currentPage - 1) * paginationData.pageSize) + paginationData.pageSize}&nbsp;
          of {paginationData.itemsTotal} entries
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="end"
          sx={{ mr: "17px" }}
        >
          <Typography style={{ fontSize: "15px", color: "#6C757D" }}>
            Display
          </Typography>
          <Box className="abc2" sx={{ width: "21%" }}>
            <TextField
              className="abc"
              id="outlined-number"
              type="number"
              defaultValue={paginationData.pageSize}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{
                p: " 5px 10px",
                "& fieldset": {
                  padding: "6px"
                },
                "& .MuiInputBase-input": {
                  padding: "5px 10px"
                },
                "& ::-webkit-inner-spin-button": {
                  opacity: 1
                },
                // "& .css-w56oqh": {
                //   width: '55%'
                // }
              }}
              onChange={handleOnChangeMaxRow}
            />
          </Box>

          <Pagination
            count={paginationData.pageTotal}
            shape="rounded"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#51CBFF !important",
                color: "white"
              }
            }}
            onClick={handlePagination}
            page={paginationData.currentPage}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
