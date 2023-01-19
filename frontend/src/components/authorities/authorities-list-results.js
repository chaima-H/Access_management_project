import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
/**import axios */
import axios from "axios";
import { SeverityPill } from "../severity-pill";
/**added imports*/
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

/**import Dialog Component*/
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";



 
   
  
function Authorities() {
    const [authorities, setAuthorities] = useState([]);
    const [selectedAuth, setSelectedAuth] = useState("");
    const [newAuthname, setNewAuthname] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
    
  
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);


  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleClick = (name, e) => {
      console.log("role" + name, e.target.value);
      setSelectedAuth(name);
   
    };

    const handleOpenDialog = (name,e) => {
      setOpenDialog(true);
     setSelectedAuth(name);
      console.log("cliked", openDialog);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleDeleteOpenDialog = (name,e) => {
        setSelectedAuth(name);
      setOpenDeleteDialog(true);
    };
  
    const handleDeleteCloseDialog = () => {
      setOpenDeleteDialog(false);
    };



   const loadAuthorities=()=>{
        axios
        .get("http://localhost:8080/authority/authorities", {
          headers: {
            Authorization: `${userToken}`,
          },
        })
        .then((res) => {
          console.log("res get all authorities", res);
          setAuthorities(res.data);
        })
    
        .catch((err) => {
          console.log("err get All authorities", err);
        });
        
      } 


  const deleteAuthority = async (authorityname,e)=>{
    await axios.delete("http://localhost:8080/authority/delete", {
      headers: {
        Authorization : `${userToken}`
      },
      data: {
      authorityName: authorityname
      }
    })  .then((res)=>{
      console.log("res delete authority",res)
     })
     
     .catch((err)=>{
      console.log("err delete authority",err)})
      loadAuthorities();
      handleDeleteCloseDialog();
  }

  const updateAuthority = async (authorityname,e)=>{
    await axios.put("http://localhost:8080/authority/updateAuthority",
    {authorityName:authorityname,newAuthority:{authorityname:newAuthname}},
     { headers: {
         'Authorization': `${userToken}`
       }}
     )
    .then((res)=>{
     console.log("res udate auth",res)
    })
    
    .catch((err)=>{
     console.log("err udate auth",err)})
     loadAuthorities();
     handleCloseDialog();
      }
   
  
  
    useEffect(()=>{
        const token = localStorage.getItem("token");
        setUserToken(token)
        console.log("userToke",userToken)
     loadAuthorities();
    },[userToken])

   
  
    return (   <Card >
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Authorityname</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authorities.map((item, index) => (
                  <TableRow
                    hover
                    key={index}
                    //selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar src="/static/images/avatars/authority.png" sx={{ mr: 2 }}>
                          {getInitials(item.authorityname)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {item.authorityname}
                        </Typography>
                      </Box>
                    </TableCell>
                   
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          onClick={(e)=>{handleOpenDialog(item.authorityname,e)}}
                          variant="contained"
                          size="small"
                          endIcon={<SendIcon />}
                        >
                          Edit authority
                        </Button>
                        <div>
                          <Dialog
                          fullWidth
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Update Authority"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Enter new authority name .
                              </DialogContentText>
                              <br/>
                              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Authority name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newAuthname}
                  onChange={(e)=>{setNewAuthname(e.target.value)}}

                />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog}>Cancel</Button>
                              <Button onClick={(e)=>{updateAuthority(selectedAuth,e)}} autoFocus>
                                Edit
                              </Button>
                 
                            </DialogActions>
                          </Dialog>
                        </div>
                        <Button  onClick={(e)=>{handleDeleteOpenDialog(item.authorityname,e)}}  variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                        <div>
                          <Dialog
                            open={openDeleteDialog}
                            onClose={handleDeleteCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete authority"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this authority? This will permanently
                                erase this authority.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDeleteCloseDialog}>Cancel</Button>
                              <Button  onClick={(e)=>{deleteAuthority(selectedAuth,e)}} autoFocus>
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
        
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card> );
}

export default Authorities;