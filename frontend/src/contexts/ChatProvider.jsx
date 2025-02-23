import { createContext, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeBlockSending } from "../reducers/usersReducer";
import { newMessage } from "../reducers/messagesReducer";
import { switchChannel, renameChannel, removeChannel } from "../reducers/channelsReducer";

const ChatContext = createContext({});

const ChatProvider = ({socket, children}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        socket.on('newMessage', (payload) => { 
            dispatch(newMessage(payload));
            dispatch(changeBlockSending(false));
          });
         
        socket.on('newChannel', (payload) => {
            dispatch(switchChannel(payload));
            dispatch(changeBlockSending(false));
          });
      
        socket.on('renameChannel', (payload) => {
            dispatch(renameChannel(payload));
            dispatch(changeBlockSending(false));
          });
      
        socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload));
            dispatch(changeBlockSending(false));
          });
    },[])
  
   const setMessage = (token, message) => {
    return axios.post('/api/v1/messages', message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
     });
  };
  
   const setChannel = (token, newChannel) => {
    return axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
     });
  };
  
   const editChannel = (token, editedChannel, id) => {
  axios.patch(`/api/v1/channels/${id}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(function (err) {
    console.log(err);
   });
  };
  
   const deleteChannel = (token, id) => {
    axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
     });
    };

    const serverActions = useMemo(() => ({
      setMessage,
      setChannel,
      editChannel,
      deleteChannel
    }),[]);



    return (
        <ChatContext.Provider value={serverActions}>
          {children}
        </ChatContext.Provider>
    )
}

export const useServer = () => useContext(ChatContext);


export default ChatProvider;