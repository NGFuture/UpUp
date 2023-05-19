import React, { useState, useEffect, createContext, useContext } from 'react';
import { useReducer } from 'react';
import { API_URL } from "../config/url";
import { useAuthContext } from './AuthContext';

const DataContext = createContext();

const initialStore = {
    quizSet: null,
    results: [],
    finishedQuizzes: [],
    dictionaryFinishedQuizzes: {},
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
            // const d = {};
            // for (const quiz of action.payload) {
            //     d[quiz._id] = quiz;
            // };
            return {
                ...store,
                finishedQuizzes: action.payload,
                dictionaryFinishedQuizzes: action.payload.reduce((d, quiz) => ({ ...d, [quiz._id]: quiz }), {}),
            }
        }
    }

    return store
};
export const DataProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [store, dispatch] = useReducer(reducer, initialStore);
    const [alertInfo, setAlertInfo] = useState({
        message: '',
        callback: ()=>{},
        open: false,
        showCancelButton: false,
    });
    const closeAlert = () => {
        setAlertInfo({
            message: '',
            callback: ()=>{},
            open: false,
            showCancelButton: false,
        })
    };
    const openAlert = (message, callback=()=>{closeAlert()}, showCancelButton=false) => {
        setAlertInfo({
            message: message,
            callback: callback,
            open: true,
            showCancelButton,
        })
    };
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
                dispatch({
                    type: "UPDATE_QUIZ_SET",
                    payload: data.item,
                });
                dispatch({
                    type: "UPDATE_RESULTS",
                    payload: data.results,
                });
                dispatch({
                    type: "UPDATE_FINISHED_QUIZZES",
                    payload: data.finishedQuizzes,
                });
            } else console.log('error');
        } catch (error) {
            console.error(error);
        }
    };

    const value = {
        quizSet: store.quizSet,
        results: store.results,
        getQuizSet,
        dictionaryFinishedQuizzes: store.dictionaryFinishedQuizzes,
        alertInfo,
        closeAlert,
        openAlert,
    }
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
};
export const useData = () => useContext(DataContext);