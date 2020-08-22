import * as types from "../types/levels";

const initialState = {
    levels: [],
    loading: true,
    error: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUESTED_LEVELS:
            return {
                ...state,
                levels: [],
                loading: true,
                error: false,
            };
        case types.REQUESTED_LEVELS_SUCCEEDED:
            return {
                ...state,
                levels: action.payload,
                loading: false,
                error: false,
            };
        case types.REQUESTED_LEVELS_FAILED:
            return {
                ...state,
                levels: null,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default reducer;