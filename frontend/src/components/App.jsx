import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import Layout from "./Layout";
import Slack from "./Slack";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import "../App.css";

import { actions } from "../reducers/usersReducer";
import { newMessage } from "../reducers/messagesReducer";
import { switchChannel } from "../reducers/channelsReducer";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName");
  useEffect(() => {

    if ((!userToken || !userName) && location.pathname === "/") {
      navigate("/login", { replace: true });
    } else {
      dispatch(actions.setUser({ username: userName, token: userToken }));
    }

    const socket = io("ws://localhost:5001");
    
    socket.on('newMessage', (payload) => { 
      dispatch(newMessage(payload));
    });
   
    socket.on('newChannel', (payload) => {
      dispatch(switchChannel(payload));
    });
    

  },[]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            dispatch={dispatch}
            setUser={actions.setUser}
            navigate={navigate}
          />
        }
      >
        <Route index element={
          <Slack
          dispatch={dispatch}
          />
        }
      />
        <Route
          path="/login"
          element={
            <Login
              dispatch={dispatch}
              setUser={actions.setUser}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/reg"
          element={
            <Reg
              dispatch={dispatch}
              setUser={actions.setUser}
              navigate={navigate}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;