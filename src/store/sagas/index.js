import { all } from 'redux-saga/effects';
import watchFetchData from './fetchSagas';

export function* watchSagas() {
  yield all([
    watchFetchData()
  ])
}