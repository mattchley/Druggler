import axios from "axios";

//methods for interacting with API Auth routes
export default {
  login: userData => 
     axios.post("/auth/login",  userData),
  signUp: userData => 
  	 axios.post('/auth/signup', userData),
  dashboard: token =>
     axios.get('/api/dashboard', {headers: {Authorization: `bearer ${token}`}}),
  getDrugsConflict: queryRes => 
     axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${queryRes}`),
  getDrugsID: search => 
        axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${search}`)
          
};