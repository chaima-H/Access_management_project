import { useState,useEffect} from 'react';
import userService from '../../services/userService';
import axios from 'axios';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';


const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const AccountProfileDetails = (props) => {

 const [userToken, setUserToken] = useState("");
 const [oldUser, setOldUser] = useState({});
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    userName: 'username',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const updateEmployee =()=>{
     
    let updatedEmp ={
      "id": oldUser.id,
      "firstname":values.firstName,
      "lastname":values.lastName,
      "username":values.userName,
    "password": oldUser.password,
    "roles": oldUser.roles,
    "enable": true

    }
    console.log("updated emp",updatedEmp)
     axios.put("http://localhost:8080/employee/updateEmployee",
    {entityName:oldUser.username,newEntity:updatedEmp},
     { headers: {
         'Authorization': `${userToken}`
       }}
     )
    .then((res)=>{
     console.log("res Update Employee",res)
    })
    
    .catch((err)=>{
     console.log("err Update Employee",err)})
    
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token)
        const loadEmploye = async ()=>{
          const userInfo = await  userService.loadUserInfo();
          setValues({firstName: userInfo.firstname,
          lastName: userInfo.lastname,
          email: 'demo@devias.io',
          userName: userInfo.username,
          state: 'Alabama',
          country: 'USA'})
          setOldUser(userInfo)
          
        }
        loadEmploye()
        
      }, [userToken])

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <TextField
                fullWidth
                label="user name"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={updateEmployee}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
