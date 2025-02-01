import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../reducers/usersReducer";
import Layout from "./Layout";
import Slack from "./Slack";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import "../App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    if (!userToken && location.pathname === "/") {
      navigate("/login", { replace: true });
    } else {
      const userName = localStorage.getItem("userName");
      dispatch(actions.setUser({ currentUser: userName, token: userToken }));
    }
  });

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
          token={userToken}
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
