import React, {createContext, FC, useState} from 'react';

interface IContext {
    notification: string,
    error: string
    handleNotification: (type: string) => void,
}


interface IErrorContext {
    children: React.ReactElement | React.ReactNode
}

export const ErrorContext = createContext<IContext>({
    notification: '',
    error: '',
    handleNotification: (type: string) => null
})

const ErrorContextProvider: FC<IErrorContext> = ({children}) => {

    const [notifications, setNotifications] = useState({notification: '', error: ''})

    const handleNotification = (type: string) => {
        setNotifications({
            ...notifications,
            error: 'error message'
        })
    }

    return (
        <ErrorContext.Provider
            value={{
                notification: notifications.notification,
                error: notifications.error,
                handleNotification
            }}

        >
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorContextProvider;
