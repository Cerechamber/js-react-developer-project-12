import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./Layout";
import Chat from "./Slack/Chat";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import LoadSpinner from "./Slack/Modals/LoadSpinner";
import "../App.css";
import { setUser } from "../reducers/usersReducer";

function App() {

  const { blockSending } = useSelector(state => state.usersReducer);
  const { channelsLoading } = useSelector(state => state.channelsReducer);
  const { messagesLoading  } = useSelector(state => state.messagesReducer);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Routes>
      <Route
        path="/"
        element={
          <Layout />
        }
      >
        <Route index element={
          <Chat
          dispatch={dispatch}
          />
        }
      />
        <Route
          path="/login"
          element={
            <Login
              dispatch={dispatch}
              setUser={setUser}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/reg"
          element={
            <Reg
              dispatch={dispatch}
              setUser={setUser}
              navigate={navigate}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

    { blockSending || messagesLoading || channelsLoading ?
    <LoadSpinner />
    :
    null
    }
    </>
  );
}

export default App;