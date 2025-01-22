import { all } from 'redux-saga/effects';
import { watchFetchUsers } from '../features/user-profile/user-profile-saga';
export function* rootSaga() {
  yield all([watchFetchUsers()]);
}
