import { createContext, useContext, useMemo } from "react";
import { toast } from 'react-toastify';

const ToastContext = createContext({});

const ToastProvider = ({children}) => {
    
    const notify = (text) => toast(text);

    const toastActions = useMemo(() => ({
        notify
    }),[]);

    return (
        <ToastContext.Provider value={toastActions}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);

export default ToastProvider;