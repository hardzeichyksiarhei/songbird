import { put, takeEvery, call } from 'redux-saga/effects';
import API from "../../networks/apis/APILevels";
import * as types from '../types/levels';
import * as actions from "../actions/levels";

function* fetchData(action) {
    const { levels, answers } = action.payload;
    try {
        yield put(actions.requestLevels());
        const data = yield call(API.fetchLevels, { levels, answers });
        yield put(actions.requestLevelsSuccess(data));
    } catch (error) {
        yield put(actions.requestLevelsError());
    }
}

export default function* watchFetchData() {
    yield takeEvery(types.FETCH_LEVELS, fetchData)
}