import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);

    const login = (type) => {
        console.log(`Logging in as: ${type}`);
        setUserType(type);
    };

    const logout = () => {
        console.log('Logging out');
        setUserType(null);
    };

    return (
        <UserContext.Provider value={{ userType, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
