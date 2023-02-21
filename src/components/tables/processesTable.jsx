import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const ProcessesTable = ({
  processes,
  handleSetProcessDelete,
  handleSetProcessEdit,
}) => {
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, processes.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1" fontWeight={600}>
                  No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" fontWeight={600}>
                  Title
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight={600}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((process, index) => (
                <TableRow
                  key={process}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      {page * rowsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="body1"
                      onClick={() => {
                        navigate(`/process/${process}`);
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {process}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Edit
                        color="primary"
                        fontSize="medium"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleSetProcessEdit(process);
                        }}
                      />
                      <Delete
                        color="error"
                        fontSize="medium"
                        onClick={() => {
                          handleSetProcessDelete(process);
                        }}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
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
      <TablePagination
        rowsPerPageOptions={[20, 40, 80]}
        component="div"
        count={processes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProcessesTable;
