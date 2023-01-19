import axios from "axios";
import jwt_decode from "jwt-decode";

class userService{
   
    async loginUser(username,password){
      let result =''
        await axios.post("http://localhost:8080/login",
        {username,password}
        ).then(res => {
           window.localStorage.setItem("token",res.headers.authorization)
            console.log('response login', res);
            result =res
          })
          .catch(err => {
            console.log('erreur login', err);
          });
          return result;
    }

    async registerUser(firstname,lastname,username,password){
        await axios.post("http://localhost:8080/employee/save",
        {firstname,lastname,username,password})
        .then(res => {
            console.log('response register', res);
          })
          .catch(err => {
            console.log('erreur register', err);
          });
        
    }

    async loadUserInfo(){
      let userInfo
      const userToken = localStorage.getItem("token");
      const decoded = jwt_decode(userToken)
     await axios
      .get(`http://localhost:8080/employee/getEmployee/${decoded.sub}`, {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      .then((res) => {
        console.log("res get user info", res);
        userInfo=res.data
        
      })
  
      .catch((err) => {
        console.log("err get user info", err);
      });
      return userInfo;
    }
}

export default new userService();