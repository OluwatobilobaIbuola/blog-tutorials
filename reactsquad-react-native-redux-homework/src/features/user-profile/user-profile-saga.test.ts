import { testSaga } from 'redux-saga-test-plan';
import { handleFetchUsers, watchFetchUsers } from './user-profile-saga';
import { fetchUsers } from './user-profile-api';
import { fetchUsersRequest, fetchUsersSuccess } from './user-profile-reducer';
import { User } from './user-profile-types';

describe('handleFetchUsers()', () => {
  it('should call the API, process the response, and dispatch success action', () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue([
        { id: '1', name: 'Oluwatobiloba Ibuola' },
        { id: '2', name: 'Kayode Kay' },
      ]),
    } as unknown as Response;

    const users: User[] = [
      { id: '1', name: 'Oluwatobiloba Ibuola' },
      { id: '2', name: 'Kayode Kay' },
    ];

    testSaga(handleFetchUsers)
      .next()
      .call(fetchUsers)
      .next(mockResponse)
      .call([mockResponse, 'json'])
      .next(users)
      .put(fetchUsersSuccess(users))
      .next()
      .isDone();
  });

  it('should take every fetchUsersRequest action and call handleFetchUsers', () => {
    testSaga(watchFetchUsers)
      .next()
      .takeEvery(fetchUsersRequest.type, handleFetchUsers)
      .finish()
      .isDone();
  });
});
