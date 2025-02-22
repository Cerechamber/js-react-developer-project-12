import { createContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeBlockSending } from "../reducers/usersReducer";
import { newMessage } from "../reducers/messagesReducer";
import { switchChannel, renameChannel, removeChannel } from "../reducers/channelsReducer";

const SocketIoProvider = ({socket, children}) => {
    let messageNew, channelNew, channelRename, channelRemove = null;
    const dispatch = useDispatch();
    const SocketContext = createContext({});
    
    useEffect(() => {
        messageNew = socket.on('newMessage', (payload) => { 
            dispatch(newMessage(payload));
            dispatch(changeBlockSending(false));
          });
       
         
        channelNew = socket.on('newChannel', (payload) => {
            dispatch(switchChannel(payload));
            dispatch(changeBlockSending(false));
          });
      
        channelRename = socket.on('renameChannel', (payload) => {
            dispatch(renameChannel(payload));
            dispatch(changeBlockSending(false));
          });
      
        channelRemove = socket.on('removeChannel', (payload) => {
            dispatch(removeChannel(payload));
            dispatch(changeBlockSending(false));
          });
    },[])

    const actions = useMemo(() => {
        return {
        messageNew,
        channelNew,
        channelRename,
        channelRemove,
        }
       },[])

    return (
        <SocketContext.Provider value={actions}>
          {children}
        </SocketContext.Provider>
    )
}


export default SocketIoProvider;