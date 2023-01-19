import axios from "axios";

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDaGlpaWlpbW91IiwiZXhwIjoxNjc0NDY0MjY1LCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiQ3JlYXRlIn1dfQ.YGT5RJlQyJ9ZwcYmr7wf9wPY22EUGF3z1zz1kXdz9Y4"
class  adminService {
      
  
    async loadAuthorities (){
        let listAuthorities=[];
       return axios
        .get("http://localhost:8080/authority/authorities", {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          console.log("res get authorities", res);
         listAuthorities = res.data
        })
    
        .catch((err) => {
          console.log("err get authorities", err);
        });
    
     
    }


    
}
 
export default new adminService();