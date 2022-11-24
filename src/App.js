import Button from "@mui/material/Button"
import { default as Grid, default as Item } from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useState, useEffect } from "react"
import "./App.css"
import CoreForm from "./components/CoreForm"
import CoreTable from "./components/CoreTable"
import logo from "./logo.svg"
import setRequest from "./utils/request"

function App() {
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [id, setId] = useState("")

  const getData = async () => {
    try {
      const { data: fetchData } = await setRequest(`/v1/album`, "get")
      setData(fetchData)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoaded(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleOpen = () => {
    setOpen(true)
    setIsNew(true)
  }

  const handleEditOpen = (id) => {
    setOpen(true)
    setIsNew(false)
    setId(id)
  }

  const handleDeleteAlbum = (id) => {
    setId(id)
    if(window.confirm("Are you sure you want to delete this album?")) {
      setRequest(`/v1/album/${id}`, "delete")
      .then(() => {
        getData()
      })
      .catch((error) => {
        setError(error.message)
      })
    }
  }

  const handleClose = () => {
    getData()
    setOpen(false)
    setIsNew(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {loaded &&
        (error ? (
          <span>Error: {error}</span>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>
                  <Typography variant="h3">Album Manager</Typography>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <Button variant="contained" onClick={handleOpen}>
                    Create
                  </Button>
                </Item>
              </Grid>
            </Grid>
            <CoreTable
              loading={loaded}
              data={data}
              handleEdit={handleEditOpen}
              handleDelete={handleDeleteAlbum}
            />
          </>
        ))}
      {open && (
        <CoreForm open={open} handleClose={handleClose} isNew={isNew} id={id} />
      )}
    </div>
  )
}

export default App
