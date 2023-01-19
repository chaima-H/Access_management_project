import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";

/**import Dialog Component*/
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**import react-select added bib */
import Select from "react-select";
/**axios */
import axios from "axios";


export const AuthorityListToolbar = (props) => {
    const [userToken, setUserToken] = useState("");
  const [newauth, setNewauth] = useState("");
  const [openDialog, setOpenDialog] = useState(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };



  const createAuth =()=>{

 axios.post("http://localhost:8080/authority/save",
{authorityname:newauth},
 { headers: {
     'Authorization': `${userToken}`
   }}
 )
.then((res)=>{
 console.log("res create authority",res)
})

.catch((err)=>{
 console.log("err create authority",err)})
 handleCloseDialog();
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    setUserToken(token)
},[userToken])


  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Authorities
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained" onClick={handleOpenDialog}>
            Add Authority
          </Button>
          <div>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Create new Authority"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  To create a new authority, please enter an authority name.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="authority name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newauth}
                  onChange={(e)=>{setNewauth(e.target.value)}}

                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={createAuth} autoFocus>
                  Create Authority
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
