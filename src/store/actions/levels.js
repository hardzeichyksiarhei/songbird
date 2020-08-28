import * as types from "../types/levels";

export const fetchLevels = (levels, answers) => {
    return { type: types.FETCH_LEVELS, payload: { levels, answers } }
};

export const requestLevels = () => {
    return { type: types.REQUESTED_LEVELS }
};

export const requestLevelsSuccess = levels => {
    return { type: types.REQUESTED_LEVELS_SUCCEEDED, payload: levels }
};

export const requestLevelsError = () => {
    return { type: types.REQUESTED_LEVELS_FAILED }
};