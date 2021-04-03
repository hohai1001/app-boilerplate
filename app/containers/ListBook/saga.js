import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_REPOS } from '../App/constants';
import { repoLoadingError, reposLoaded } from './actions';

// Individual exports for testingggggggggggggg

function* listBookSaga() {
  // See example in containers/HomePage/saga.js
  const requestURL = 'https://jsonplaceholder.typicode.com/posts';
  try {
    // Call our request helper (see 'utils/request')
    // console.log('sage --- listBookSaga');
    const repos = yield call(request, requestURL);
    // console.log('sage --- listBookSaga', repos);

    yield put(reposLoaded(repos));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, listBookSaga);
}
