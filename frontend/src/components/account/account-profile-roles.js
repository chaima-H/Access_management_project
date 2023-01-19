import { useState,useEffect } from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import userService from '../../services/userService';
import { SeverityPill } from "../severity-pill";
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";

  import { getInitials } from "../../utils/get-initials";


  

function AccountProfileRoles() {
   
    const [employee, setEmployee] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
    
        const loadEmploye = async ()=>{
          const userInfo = await  userService.loadUserInfo();
          console.log("userINfo from roles",userInfo)
          setEmployee(userInfo)
          setRoles(userInfo.roles)
          
        }
        loadEmploye()
        
      }, [])

    return ( <Card >
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rolename</TableCell>
                  <TableCell>Authorities</TableCell>
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
                        <Avatar src="/static/images/avatars/authority.png" sx={{ mr: 2 }}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card> );
}

export default AccountProfileRoles;