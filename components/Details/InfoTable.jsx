"use client";
import Box from "@mui/material/Box";
import { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Link from "next/link";
import { IoIosShareAlt } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  { field: "designation", headerName: "Title", width: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 220,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 220,
  },
  {
    field: "appicants",
    headerName: "Appicants",
    width: 220,
  },
  {
    field: "share_link",
    headerName: "Share",
    width: 220,
  },
];

const InfoTable = ({ rows }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => { }

  return (
    <div className="relative overflow-hidden w-full">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow className="">
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              ) : (
                rows?.map((row, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell align="left" width={180} className="capitalize">
                      {row.designation}
                    </TableCell>
                    <TableCell align="left" width={180} className="capitalize">
                      <div className="flex items-center justify-start gap-2 capitalize">
                        <span
                          className={`h-2 w-2 rounded-full ${row?.status.toLowerCase() === "draft"
                            ? "bg-yellow-300"
                            : row?.status.toLowerCase() === "done"
                              ? "bg-blue-500"
                              : row?.status.toLowerCase() === "active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            } drop-shadow-sm`}
                        ></span>
                        <span className="font-semibold">{row?.status}</span>
                      </div>{" "}
                    </TableCell>
                    <TableCell align="left" width={80} className="capitalize">
                      <div className="flex items-center gap-4">
                        <button className="px-4 py-2 font-medium bg-paleBlue text-white rounded-md capitalize text-sm">
                          review
                        </button>
                        <AiFillDelete size={20} className="text-red-500" />
                      </div>
                    </TableCell>
                    <TableCell align="left" width={180} className="capitalize">
                      {row.applicants}
                    </TableCell>
                    <TableCell align="left" width={80} className="capitalize">
                      {/* <Link href={row.share_link}> */}
                      <IoIosShareAlt size={20} />
                      {/* </Link> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter
              style={{
                width: "100%",
              }}
            >
              <TableRow
                sx={{
                  width: "100%",
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[1, 5]}
                  colSpan={5}
                  count={totalPages}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default InfoTable;
