import { put, takeEvery, call } from 'redux-saga/effects';
import * as types from '../types/levels';
import * as actions from "../actions/levels";

import { API_URL } from '../../config';

function* fetchData(action) {
    const { levels, answers } = action.payload;
    try {
        yield put(actions.requestLevels());
        const data = yield call(fetchLevels, { levels, answers });
        yield put(actions.requestLevelsSuccess(data));
    } catch (error) {
        yield put(actions.requestLevelsError());
    }
}

async function fetchLevels({ levels, answers }) {
    const response = await fetch(`${API_URL}/birds?levels=${levels}&answers=${answers}`);
    return await response.json();
}

export default function* watchFetchData() {
    yield takeEvery(types.FETCH_LEVELS, fetchData)
}