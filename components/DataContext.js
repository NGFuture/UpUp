import React, { useState, useEffect, createContext, useContext } from 'react';
import { useReducer } from 'react';
import { API_URL } from "../config/url";
import { useAuthContext } from './AuthContext';

const DataContext = createContext();

const initialStore = {
    quizSet: null,
    results: [],
    finishedQuizzes: [],
};
const reducer = (store, action) => {
    switch (action.type) {
        case "UPDATE_RESULTS": {
            return {
                ...store,
                results: action.payload,
            }
        }
        case "UPDATE_QUIZ_SET": {
            return {
                ...store,
                quizSet: action.payload,
            }
        }
        case "UPDATE_FINISHED_QUIZZES": {
            return {
                ...store,
                finishedQuizzes: action.payload,
            }
        }
    } 
    return store
};
export const DataProvider = ({children}) => {
    const { user } = useAuthContext();
    const [ store, dispatch ] = useReducer(reducer, initialStore);
    const [quizSet, setQuizSet] = useState(null);
    // const [results, setResults] = useState([]);
    const [finishedQuizzes, setFinishedQuizzes] = useState([]);
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
                // setResults(data.results);
                dispatch({
                    type: "UPDATE_RESULTS",
                    payload: data.results,
                });
                setFinishedQuizzes(data.finishedQuizzes);
            } else console.log('error');
        } catch (error) {
            console.error(error);
        }
    };


    const value = {quizSet, results: store.results, getQuizSet, finishedQuizzes}
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
};
export const useData = () => useContext(DataContext);