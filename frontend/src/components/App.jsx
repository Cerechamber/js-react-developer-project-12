import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../reducers/authReducer";
import Slack from "./Slack";
import Login from "./Login";
import Reg from "./Reg";
import NotFound from "./NotFound";
import "../App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if ((!userToken) && location.pathname === '/') {
      navigate("/login", { replace: true });
    } else {
      const userName = localStorage.getItem("userName");
      dispatch(actions.setUser({name: userName, token: userToken}));
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Slack />} />
      <Route
        path="/login"
        element={<Login dispatch={dispatch} setUser={actions.setUser} />}
      />
      <Route
        path="/reg"
        element={<Reg dispatch={dispatch} setUser={actions.setUser} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
