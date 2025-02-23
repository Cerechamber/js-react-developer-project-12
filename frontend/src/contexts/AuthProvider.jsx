import { createContext, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeBlockSending } from "../reducers/usersReducer";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {

    },[]);

    const regUser = (name, password) => {
        return axios.post('/api/v1/signup', { username: name, password: password }).then((response) => {
             return response.data;
           })
           .catch(function (err) {
             return err;
            });
     }
     
      const authUser = (name, password) => {
         return axios.post('/api/v1/login', { username: name, password: password }).then((response) => {
             return response.data;
           })
           .catch(function (err) {
             return err;
           });
     }

     const authActions = useMemo(() => ({
        regUser,
        authUser
     }),[]);


    return (
        <AuthContext.Provider value={ authActions }>
            {children}
        </AuthContext.Provider>
    )
}

export const getAuth = () => useContext(AuthContext);

export default AuthProvider;