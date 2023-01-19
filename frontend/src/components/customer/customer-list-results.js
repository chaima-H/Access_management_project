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

/**import react-select added bib */
import Select from "react-select";

import {REACT_APP_SERVER_API_URL} from '../../../env';

export const CustomerListResults = ({ customers, ...rest }) => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = (name, e) => {
    console.log("username" + name, e.target.value);
    setSelectedEmp(name);
    console.log("selected", selectedEmp);
  };
  const handleOpenDialog = (name,e) => {
    setOpenDialog(true);
    setSelectedEmp(name);
    settinhgOptions();
    console.log("cliked", openDialog);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteOpenDialog = (name,e) => {
    setSelectedEmp(name);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const loadEmployees=()=>{
    console.log("base",REACT_APP_SERVER_API_URL)
    axios
    .get(`${REACT_APP_SERVER_API_URL}employee/employees`, {
      headers: {
        Authorization: `${userToken}`,
      },
    })
    .then((res) => {
      console.log("res get all employees", res);
      setEmployees(res.data);
    })

    .catch((err) => {
      console.log("err get All employees", err);
    });
  }

  const loadRoles=()=>{
    axios
    .get("http://localhost:8080/role/roles", {
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
    
  }
  const settinhgOptions =  ()=>{
    let resultRoles=[]
    console.log("roles",roles)
    roles.map((item)=>{
        resultRoles.push(
            {value:item.rolename, label:item.rolename}
        )
        })
    setOptions(resultRoles)
  }

  const assignRole =async (username,rolename,e)=>{
    console.log("username",username,"rolename",rolename)

    await axios.post("http://localhost:8080/employee/assignrole",
   {userName:username,roleName:rolename},
    { headers: {
        'Authorization': `${userToken}`
      }}
    )
   .then((res)=>{
    console.log("res assign role",res)
   })
   
   .catch((err)=>{
    console.log("err assign role",err)})
    loadEmployees();
    handleCloseDialog();
    
}

const deleteEmployee = async (username,e)=>{
  await axios.delete("http://localhost:8080/employee/deletemployee", {
    headers: {
      Authorization : `${userToken}`
    },
    data: {
    userName: username
    }
  })  .then((res)=>{
    console.log("res delete emp",res)
   })
   
   .catch((err)=>{
    console.log("err delete emp",err)})
    loadEmployees();
    handleDeleteCloseDialog();
}
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token)
   loadEmployees()
   loadRoles()

  }, [userToken]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((item, index) => (
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
                      <Avatar src="/static/images/avatars/avatar_1.png" sx={{ mr: 2 }}>
                        {getInitials(item.firstname)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {item.firstname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.lastname}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>
                    {item.roles.length != 0 ? item.roles.map((role)=>(<SeverityPill style={{marginRight:"2px"}}
                      color="success" >
                      {role.rolename}
                    </SeverityPill>)): <SeverityPill
                      color="error">
                      pending
                    </SeverityPill>}
                    
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={(e)=>{handleOpenDialog(item.username,e)}}
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                      >
                        Assign role
                      </Button>
                      <div>
                        <Dialog
                          open={openDialog}
                          onClose={handleCloseDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{"Assign role"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Select role you want to assign to this employee {selectedEmp} .
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
                            <Button onClick={(e)=>{assignRole(selectedEmp,selectedOption.value,e)}} autoFocus>
                              Assign Role
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                      <Button     onClick={(e)=>{handleDeleteOpenDialog(item.username,e)}} variant="outlined" size="small" startIcon={<DeleteIcon />}>
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
                              Are you sure you want to delete this account ? This will permanently
                              erase this account.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleDeleteCloseDialog}>Cancel</Button>
                            <Button onClick={(e)=>{deleteEmployee(selectedEmp,e)}} autoFocus>
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
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
