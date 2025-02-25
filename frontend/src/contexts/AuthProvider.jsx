import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { useToast } from "./ToastProvider";
import { setUser, changeBlockSending } from "../reducers/usersReducer";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const { notify } = useToast();
  const { t } = useTranslation();

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

  useEffect(() => {
    if ((userName || userToken) && (location.pathname === "/login" || location.pathname === "/reg")) {
      navigate("/", { replace: true });
    }
  },[userToken, userName]);

    const regUser = (name, password) => {
        return axios.post('/api/v1/signup', { username: name, password: password }).then((response) => {
             return response.data;
           })
           .catch(function (err) {
            if (err.status === 409) {
              dispatch(changeBlockSending(false));
              return err
            } else {
              notify(t('notify.errorLoading'));
              dispatch(changeBlockSending(false));
              return 'no-connection';
            }
            });
     }
     
      const authUser = (name, password) => {
         return axios.post('/api/v1/login', { username: name, password: password }).then((response) => {
             return response.data;
           })
           .catch(function (err) {
            if (err.status === 401) {
              dispatch(changeBlockSending(false));
              return err
            } else {
              notify(t('notify.errorLoading'));
              dispatch(changeBlockSending(false));
              return 'no-connection';
            }
           });
     }

     const authOut = () => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userName");
      dispatch(setUser({}));
      navigate("/login", { replace: true });
     }

     const authActions = useMemo(() => ({
        regUser,
        authUser,
        authOut
     }),[]);


    return (
        <AuthContext.Provider value={ authActions }>
            {children}
        </AuthContext.Provider>
    )
}

export const getAuth = () => useContext(AuthContext);

export default AuthProvider;