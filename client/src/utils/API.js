import axios from "axios";

//methods for interacting with API Auth routes
export default {
   login: userData =>
      axios.post("/auth/login", userData),
   signUp: userData =>
      axios.post('/auth/signup', userData),
   dashboard: token =>
      axios.get('/api/dashboard', { headers: { Authorization: `bearer ${token}` } }),
   getDrugsConflict: (queryRes,token) =>
      axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${queryRes}`, { headers: { Authorization: `bearer ${token}` } }),
   getDrugsID: (search,token) =>
      axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${search}`, { headers: { Authorization: `bearer ${token}` } }),
   saveDrug: (drugData, token)=> 
      axios.post("/api/drugs", drugData, { headers: { Authorization: `bearer ${token}` } }),
   getUser: (id, token)  =>
      axios.get("/api/user/" + id, { headers: { Authorization: `bearer ${token}` } }),
   saveDrugtoUser: (user_id, drug, token) => 
      axios.put("api/user/"+ user_id, drug, { headers: { Authorization: `bearer ${token}` } })  
};