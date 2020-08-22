import * as types from "../types/app";

const initialState = {
    isSounds: true
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SOUNDS:
            return {
                isSounds: !state.isSounds
            };
        default:
            return state;
    }
};

export default reducer;