import {UserActionTypes} from "./user.types";

const INIT_STATE = {
    currentUser: null
};

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                error: action.payload
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };
        // case UserActionTypes.SIGN_UP_START:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     };
        default:
            return state;
    }
};

export default userReducer;