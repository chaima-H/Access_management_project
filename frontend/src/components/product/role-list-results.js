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
  Typography,
  TextField,
  FormControlLabel,
  FormGroup,
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
import EditIcon from "@mui/icons-material/Edit";

/**import Dialog Component*/
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**import react-select added bib */
import Select from "react-select";

/**new imports */
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled, alpha } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

/*** basue url*/
import { REACT_APP_SERVER_API_URL } from "../../../env";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

function Roles() {
  const [roles, setRoles] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [newrolename, setNewrolename] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [roleAuth, setRoleAuth] = useState([]);
  const [selectedAuth, setSelectedAuth] = useState("");

  /*** */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickMenu = (name, event) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole(name);
    console.log("name", name);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleChange = (event) => {
    setCheckedAuthority(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    //setSelectedRole(name);
    settinhgOptions();
    console.log("cliked", openDialog);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleEditOpenDialog = () => {
    setOpenEditDialog(true);
  };

  const handleEditCloseDialog = () => {
    setOpenEditDialog(false);
  };
  const handleRejcetOpenDialog = () => {
    let result = roles.find((item) => item.rolename == selectedRole);
    console.log("result", result);
    setRoleAuth(result.authorities);
    setOpenRejectDialog(true);
  };

  const handleRejectCloseDialog = () => {
    setOpenRejectDialog(false);
  };
  const handleDeleteOpenDialog = (name, e) => {
    setSelectedRole(name);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const loadRoles = () => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}role/roles`, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => {
        console.log("res get all roles", res);
        setRoles(res.data);
      })

      .catch((err) => {
        console.log("err get All roles", err);
      });
  };

  const loadAuthorities = () => {
    axios
      .get(`${REACT_APP_SERVER_API_URL}authority/authorities`, {
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
  };

  const settinhgOptions = () => {
    let resultAuthorities = [];
    authorities.map((item) => {
      resultAuthorities.push({ value: item.authorityname, label: item.authorityname });
    });
    setOptions(resultAuthorities);
  };

  const assignAuthority = async (rolename, authorityName, e) => {
    await axios
      .post(
        `${REACT_APP_SERVER_API_URL}role/assignauthority`,
        { roleName: rolename, authorityName: authorityName },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res assign authority", res);
      })

      .catch((err) => {
        console.log("err assign authority", err);
      });
    loadRoles();
    handleCloseDialog();
  };
  const deleteRole = async (rolename, e) => {
    await axios
      .delete(`${REACT_APP_SERVER_API_URL}role/deleterole`, {
        headers: {
          Authorization: `${userToken}`,
        },
        data: {
          roleName: rolename,
        },
      })
      .then((res) => {
        console.log("res delete role", res);
      })

      .catch((err) => {
        console.log("err delete role", err);
      });
    loadRoles();
    handleEditCloseDialog();
  };

  const editRole = async (rolename, e) => {
    await axios
      .put(
        `${REACT_APP_SERVER_API_URL}role/updateRole`,
        { roleName: rolename, newRole: { rolename: newrolename } },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res udate auth", res);
      })

      .catch((err) => {
        console.log("err udate auth", err);
      });
    loadRoles();
    handleCloseDialog();
  };

  const rejectAuth = async () => {
    await axios
      .put(
        `${REACT_APP_SERVER_API_URL}role/rejectAuthority`,
        { roleName: selectedRole, authorityName:selectedAuth },
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("res reject auth", res);
      })

      .catch((err) => {
        console.log("err reject auth", err);
      });
    loadRoles();
    handleRejectCloseDialog();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
    loadRoles();
    loadAuthorities();
  }, [userToken]);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rolename</TableCell>
                <TableCell>Authorities</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((item, index) => (
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
                      <Avatar src="/static/images/avatars/icon.png" sx={{ mr: 2 }}>
                        {getInitials(item.rolename)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {item.rolename}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.authorities.length != 0 ? (
                      item.authorities.map((role) => (
                        <SeverityPill style={{ marginRight: "2px" }} color="success">
                          {role.authorityname}
                        </SeverityPill>
                      ))
                    ) : (
                      <SeverityPill color="error">pending</SeverityPill>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClickMenu(item.rolename, e)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          "aria-labelledby": "demo-customized-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleEditOpenDialog} disableRipple>
                          <EditIcon />
                          Edit
                        </MenuItem>
                        <div>
                          <Dialog
                            fullWidth
                            open={openEditDialog}
                            onClose={handleEditCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Edit Role"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Enter new role name .
                              </DialogContentText>
                              <br />
                              <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="role name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newrolename}
                                onChange={(e) => {
                                  setNewrolename(e.target.value);
                                }}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleEditCloseDialog}>Cancel</Button>
                              <Button
                                onClick={(e) => {
                                  editRole(selectedRole, e);
                                }}
                                autoFocus
                              >
                                Edit
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <MenuItem
                          onClick={(e) => {
                            handleDeleteOpenDialog(e);
                          }}
                          disableRipple
                        >
                          <DeleteIcon />
                          Delete
                        </MenuItem>
                        <div>
                          <Dialog
                            open={openDeleteDialog}
                            onClose={handleDeleteCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete employee account"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                {selectedRole}
                                Are you sure you want to delete this role ? This will permanently
                                erase this role and its associated authorities.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDeleteCloseDialog}>Cancel</Button>
                              <Button
                                onClick={(e) => {
                                  deleteRole(selectedRole, e);
                                }}
                                autoFocus
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem
                          onClick={(e) => {
                            handleOpenDialog(item.rolename, e);
                          }}
                          disableRipple
                        >
                          <ArchiveIcon />
                          Assign authority
                        </MenuItem>
                        <div>
                          <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Assign authority"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Select authority you want to assign to this role .
                              </DialogContentText>
                              <br />
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog}>Cancel</Button>
                              <Button
                                onClick={(e) => {
                                  assignAuthority(selectedRole, selectedOption.value, e);
                                }}
                                autoFocus
                              >
                                Assign Authority
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                        <MenuItem onClick={handleRejcetOpenDialog} disableRipple>
                          <ClearIcon />
                          Reject authority
                        </MenuItem>
                        <div>
                          <Dialog
                            open={openRejectDialog}
                            onClose={handleRejectCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Reject authority"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Select authority you want to reject from this role .
                              </DialogContentText>
                              <br/>
                              {roleAuth.length != 0 ?  roleAuth.map((r,index)=>(  
                              <div><FormControlLabel key={index} control={<Checkbox value={r.authorityname} onChange={(e)=>setSelectedAuth(e.target.value)}/>} label={r.authorityname} />
                             </div> ))
                            :null}
                               
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleRejectCloseDialog}>Cancel</Button>
                              <Button onClick={rejectAuth} autoFocus>
                                Reject Authority
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </StyledMenu>
                    </div>
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
    </Card>
  );
}

export default Roles;

/**<Stack direction="row" spacing={2}>
                        <Button
                          onClick={(e)=>{handleOpenDialog(item.rolename,e)}}
                          variant="contained"
                          size="small"
                          endIcon={<SendIcon />}
                        >
                          Assign 
                        </Button>
                        <div>
                          <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Assign authority"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Select authority you want to assign to this role  .
                              </DialogContentText>
                              <br />
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog}>Cancel</Button>
                              <Button onClick={(e)=>{assignAuthority(selectedRole,selectedOption.value,e)}} autoFocus>
                                Assign Authority
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>

                        <Button  onClick={(e)=>{handleDeleteOpenDialog(item.rolename,e)}}  variant="outlined" color="error" size="small" startIcon={<DeleteIcon />}>
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
                              {"Delete employee account"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this role ? This will permanently
                                erase this role and its associated authorities.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleDeleteCloseDialog}>Cancel</Button>
                              <Button onClick={(e)=>{deleteRole(selectedRole,e)}} autoFocus>
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </Stack> */
