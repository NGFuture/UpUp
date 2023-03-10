import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { API_URL } from "../config/url";

const AuthContext = createContext();
const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
const setUserIntoStorage = async (user) => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        loaded: false,
    });
    useEffect(() => {
        (async () => {
            const storedUser = await getUserFromStorage();
            if (storedUser) {
                setUser(storedUser);
                return
            };
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
            });
            const data = await response.json();
            const createdUser = {
                ...data.item,
                loaded: true,
            }
            setUser(createdUser);
            setUserIntoStorage(createdUser);
        })();
    }, []);
    return <AuthContext.Provider value={{
        user
    }}>
        {children}
    </AuthContext.Provider>
};

export const useAuthContext = () => useContext(AuthContext);