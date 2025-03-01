import { createContext, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { changeBlockSending } from "../reducers/usersReducer";
import { newMessage } from "../reducers/messagesReducer";
import { switchChannel, renameChannel, removeChannel } from "../reducers/channelsReducer";
import { useToast } from "./ToastProvider";

const ChatContext = createContext({});

const ChatProvider = ({socket, children}) => {

    const dispatch = useDispatch();
    const { notify, profanityNo } = useToast();

    const { t } = useTranslation();
    
    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(newMessage(payload));
            dispatch(changeBlockSending(false));
          });
         
        socket.on('newChannel', (payload) => {
            dispatch(switchChannel(payload));
            dispatch(changeBlockSending(false));
            notify(t('notify.addChannel'));
          });
      
        socket.on('renameChannel', (payload) => {
            dispatch(renameChannel(payload));
            dispatch(changeBlockSending(false));
            notify(t('notify.editChannel'));
          });
      
        socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload));
            dispatch(changeBlockSending(false));
            notify(t('notify.deleteChannel'));
          });
    },[])
  
   const setMessage = (token, message) => {
    message.body = profanityNo(message.body);
    return axios.post('/api/v1/messages', message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
      notify(t('notify.errorLoading'));
      dispatch(changeBlockSending(false));
     });
  };
  
   const setChannel = (token, newChannel) => {
    newChannel.name = profanityNo(newChannel.name);
    return axios.post('/api/v1/channels', newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
      notify(t('notify.errorLoading'));
      dispatch(changeBlockSending(false));
     });
  };
  
   const editChannel = (token, editedChannel, id) => {
    editedChannel.name = profanityNo(editedChannel.name);
  axios.patch(`/api/v1/channels/${id}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(function (err) {
    console.log(err);
    notify(t('notify.errorLoading'));
    dispatch(changeBlockSending(false));
   });
  };
  
   const deleteChannel = (token, id) => {
    axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch(function (err) {
      console.log(err);
      notify(t('notify.errorLoading'));
      dispatch(changeBlockSending(false));
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

export const getChannels = (token) => {
  return axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.data;
    });
};

export const getMessages = (token) => {
  return axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};


export default ChatProvider;