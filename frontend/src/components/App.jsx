import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Provider, ErrorBoundary } from '@rollbar/react';
import Layout from "./Layout";
import Chat from "./Slack/Chat";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import LoadSpinner from "./Slack/Modals/LoadSpinner";
import "../App.css";
import { setUser } from "../reducers/usersReducer";

function App() {

  const rollbarConfig = {
    accessToken: '3466a76405b64aff96199c130b6abc05',
    environment: 'testenv',
  };

  const { blockSending } = useSelector(state => state.usersReducer);
  const { channelsLoading } = useSelector(state => state.channelsReducer);
  const { messagesLoading  } = useSelector(state => state.messagesReducer);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function TestError() {
    const a = null;
    return a.hello();
  }

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
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
    </Provider>
  );
}

export default App;