import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./Layout";
import Slack from "./Slack";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import "../App.css";

import { setUser } from "../reducers/usersReducer";

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
      dispatch(setUser({ username: userName, token: userToken }));
    }
  },[]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            dispatch={dispatch}
            setUser={setUser}
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
  );
}

export default App;