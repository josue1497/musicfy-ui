import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import LinearProgress from "@mui/material/LinearProgress"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"

export default function CoreTable({
  loading = false,
  data = [],
  handleEdit,
  handleDelete,
}) {
  return (
    <TableContainer component={Paper}>
      {!loading ? <LinearProgress width="100%" /> : null}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">Year (2010 - 2022)</TableCell>
            <TableCell align="center">Tools</TableCell>
          </TableRow>
        </TableHead>
        {loading && (
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      row.albumCover ||
                      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                    }
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell align="center">{row.albumName}</TableCell>
                <TableCell align="center">{`${row.artistName || ""} ${
                  row.artistLastname || ""
                }`}</TableCell>
                <TableCell align="center">{row.albumYear}</TableCell>
                <TableCell align="center">
                  <Button variant="text" onClick={() => handleEdit(row._id)}>
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  )
}
