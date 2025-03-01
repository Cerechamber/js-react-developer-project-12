import { createContext, useContext, useMemo } from "react";
import { toast } from 'react-toastify';
import * as leoProfanity from 'leo-profanity';

const ToastContext = createContext({});

const ruDictionary = leoProfanity.getDictionary('ru');
const enDictionary = leoProfanity.getDictionary('en');
leoProfanity.add(ruDictionary, enDictionary);

const ToastProvider = ({children}) => {
    
    const notify = (text) => {
        if (text.includes('Error') || text.includes('Ошибка')) {
            toast.error(text);
            return
        }
        toast.info(text);
    }

    const profanityNo = (text) => {
        return leoProfanity.clean(text);
    }

    const helperActions = useMemo(() => ({
        notify,
        profanityNo
    }),[]);

    return (
        <ToastContext.Provider value={helperActions}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);

export default ToastProvider;