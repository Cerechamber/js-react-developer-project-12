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

export const getMessages = (token) => {
  return axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    //return response.data;
    const mess = [
      {
        id: '1',
        body: 'text message',
        channelId: '1',
        username: 'admin',
      },
      {
        id: '2',
        body: 'text fucker',
        channelId: '1',
        username: 'saka',
      },
      {
        id: '3',
        body: 'text saka',
        channelId: '2',
        username: 'faka',
      },
      {
        id: '4',
        body: 'next',
        channelId: '1',
        username: 'faka',
      }
    ]
    return mess;
  })
  .catch(function (err) {
    console.log(err);
   });
}