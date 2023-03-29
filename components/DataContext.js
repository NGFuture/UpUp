import React, { useState, useEffect, createContext, useContext } from 'react';
import { API_URL } from "../config/url";
import { useAuthContext } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const { user } = useAuthContext();
    const [quizSet, setQuizSet] = useState(null);
    const [results, setResults] = useState([]);
    const getQuizSet = async () => {
        try {
            const response = await fetch(`${API_URL}/quiz-sets/my`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authuserid': user.id,
                },
            });
            const data = await response.json();
            if (data.item) {
                setQuizSet(data.item);
                setResults(data.results);
            } else console.log('error');
        } catch (error) {
            console.error(error);
        }
    };


    const value = {quizSet, results, getQuizSet}
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
};
export const useData = () => useContext(DataContext);