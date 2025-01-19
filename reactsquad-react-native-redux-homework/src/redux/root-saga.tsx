import { all } from 'redux-saga/effects';
import watchHandleFetchUsers from '../features/user-profile/user-profile-saga';
export function* rootSaga() {
  yield all([watchHandleFetchUsers()]);
}
