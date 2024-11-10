const commonReducer = (state, action) => {
    switch (action.type) {

        // Toggle Form Open/Close
        case 'TOGGLE_FORM':
            return {
                ...state,
                isFormOpen: action.payload.toggle
            };

        // Set User Info for the Form
        case 'SET_FORM_USER_INFO':
            return {
                ...state,
                formUserInfo: action.payload.info
            };

        // Set Login Status
        case 'SET_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload.val
            };
            
        // Set Loading State
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload.val
            };

        default:
            return state;
    }
};

export default commonReducer;
