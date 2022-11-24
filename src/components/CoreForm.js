import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { default as Grid, default as Item } from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import setRequest from "../utils/request"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const defaultBody = {
  albumName: "",
  artistName: "",
  artistLastname: "",
  albumYear: "2022",
  albumCover: "",
}

const footerStyle = {
  marginTop: "3vh",
  textAlign: "center",
}

const allowedYears = [
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
]
export default function CoreForm({ open, isNew, handleClose, id }) {
  const [data, setData] = useState({ ...defaultBody })
  const [error, setError] = useState("")

  const getData = async () => {
    try {
      if (!isNew && id) {
        const { data: fetchData } = await setRequest(`/v1/album/${id}`, "get")
        setData({ ...fetchData })
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    try {
      if (!isNew && id) {
        await setRequest(`/v1/album/${id}`, "put", data)
        handleClose()
        return
      }

      await setRequest(`/v1/album`, "post", data)
      handleClose()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">{isNew ? "Create album" : "Edit Album"}</h2>
        {error && <Typography id="parent-modal-description" variant="h6" color="error">Error: {error}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item>
              <TextField
                id="albumName"
                name="albumName"
                label="Title"
                variant="standard"
                value={data.albumName}
                onChange={handleChange}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                id="authorName"
                name="artistName"
                label="Author name"
                variant="standard"
                value={data.artistName}
                onChange={handleChange}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                id="authorLastname"
                name="artistLastname"
                label="Author Lastname"
                value={data.artistLastname}
                onChange={handleChange}
                variant="standard"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                id="albumCover"
                name="albumCover"
                label="Cover URL"
                type="url"
                value={data.albumCover}
                onChange={handleChange}
                variant="standard"
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <InputLabel id="demo-simple-select-standard-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="albumYear"
                name="albumYear"
                value={data.albumYear}
                onChange={handleChange}
                variant="standard"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allowedYears.map((year, index) => (
                  <MenuItem value={year} key={index}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ ...footerStyle }}>
          <Grid item xs={6}>
            <Item>
              <Button variant="text" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Button variant="text" color="success" onClick={handleSubmit}>
                Save
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
