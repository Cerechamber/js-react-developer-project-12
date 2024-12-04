import axios from "axios";

export const regUser = (name, password) => {
   return axios.post('/api/v1/signup', { username: name, password: password }).then((response) => {
        return response.data;
      })
      .catch(function (err) {
        console.log(err);
       });
}

export const authUser = (name, password) => {
    return axios.post('/api/v1/login', { username: name, password: password }).then((response) => {
        return response.data;
      })
      .catch(function (err) {
       console.log(err);
      });
}

export const getChannels = (token) => {
    return axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        return response.data;
      })
      .catch(function (err) {
        console.log(err);
       });
}