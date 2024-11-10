import React, { createContext, useReducer } from 'react';  // <-- Add React import here
import commonReducer from './reducer';

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
    isFormOpen: false,
    formUserInfo: '',
    isLoggedIn: false,
    loading: true
};

// Common-Provider Component
const CommonProvider = ({ children }) => {

    const [state, dispatch] = useReducer(commonReducer, initialState);

    // Actions related to initialState variables
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const setFormUserInfo = (info) => {
        return dispatch({
            type: 'SET_FORM_USER_INFO',
            payload: { info }
        });
    };

    const setLoggedIn = (val) => {
        return dispatch({
            type: "SET_LOGGED_IN",
            payload: { val }
        });
    };

    const setLoading = (val) => {
        return dispatch({
            type: 'SET_LOADING',
            payload: { val }
        });
    };

    // Context values
    const values = {
        ...state,
        toggleForm,
        setFormUserInfo,
        setLoggedIn,
        setLoading
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };
