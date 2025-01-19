import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUsers } from './user-profile-api';
import { fetchUsersRequest, fetchUsersSuccess } from './user-profile-reducer';
import { User } from './user-profile-types';

function* handleFetchUsers() {
  try {
    const response: Response = yield call(fetchUsers);
    const users: User[] = yield call([response, 'json']);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

export default function* watchHandleFetchUsers() {
  yield takeEvery(fetchUsersRequest.type, handleFetchUsers);
}
