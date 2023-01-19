import { useState,useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { REACT_APP_SERVER_API_URL } from "../../../env";
import axios from 'axios';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import userService from '../../services/userService';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const AccountProfile = (props) => {

  const [employee, setEmployee] = useState({});
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState("");

 /*  const loadUserInfo =()=>{
   
    axios
    .get(`${REACT_APP_SERVER_API_URL}employee/getEmployee/${username}`, {
      headers: {
        Authorization: `${userToken}`,
      },
    })
    .then((res) => {
      console.log("res get user info", res);
      setEmployee(res.data)
      
    })

    .catch((err) => {
      console.log("err get user info", err);
    });
    
  } */

  useEffect(() => {
    
    const loadEmploye = async ()=>{
      const userInfo = await  userService.loadUserInfo();
      console.log("userINfo",userInfo)
      setEmployee(userInfo)
    }
    loadEmploye()
     
    /*   const token = localStorage.getItem("token");
      setUserToken(token)
      const decoded = jwt_decode(token)
      console.log("username",decoded.sub)
      setUsername(decoded.sub)
      loadUserInfo(); */

  }, [])
 
  return (  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {employee.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${employee.firstname} ${employee.lastname}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>)


        };
