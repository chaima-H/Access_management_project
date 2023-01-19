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



export const ProductListToolbar = (props) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [newrole, setNewrole] = useState("");
  const [userToken, setUserToken] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [authorities, setAuthorities] = useState([]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const loadAuthorities = () => {
    let resultAuthorities = [];
    axios
      .get("http://localhost:8080/authority/authorities", {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => {
        console.log("res get all authorities", res);
        res.data.map((item) => {
          resultAuthorities.push({ value: item, label: item.authorityname });
        });
        setAuthorities(resultAuthorities);
      })

      .catch((err) => {
        console.log("err get All authorities", err);
      });
  };

  const createRole =()=>{
    let selectedAuth=[]
    selectedOption.map((item)=>{
      selectedAuth.push(item.value)
    })
 axios.post("http://localhost:8080/role/save",
{rolename:newrole,authorities:selectedAuth},
 { headers: {
     'Authorization': `${userToken}`
   }}
 )
.then((res)=>{
 console.log("res create role",res)
})

.catch((err)=>{
 console.log("err create role",err)})
 handleCloseDialog();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token)
    console.log("userToke",userToken)
    loadAuthorities();
  }, [userToken]);

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
          Roles
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained" onClick={handleOpenDialog}>
            Add Role
          </Button>
          <div>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Create new Role"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  To create a new role, please enter a role name.You can also
                  select authority you want to assign to this role .
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Role name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newrole}
                  onChange={(e)=>{setNewrole(e.target.value)}}

                />
                    <br />
                <br />
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={authorities}
                  isMulti
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={createRole} autoFocus>
                  Create Role
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
