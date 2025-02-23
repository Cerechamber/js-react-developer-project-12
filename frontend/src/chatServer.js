import axios from "axios";

export const regUser = (name, password) => {
   return axios.post('/api/v1/signup', { username: name, password: password }).then((response) => {
        return response.data;
      })
      .catch(function (err) {
        return err;
       });
}

export const authUser = (name, password) => {
    return axios.post('/api/v1/login', { username: name, password: password }).then((response) => {
        return response.data;
      })
      .catch(function (err) {
        return err;
      });
}





