/* eslint-disable no-param-reassign */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_LISTBOOK, LOAD_LOADMORE } from './constants';
import { loadListBookError, loadListBookSuccess } from './actions';

// Individual exports for testingggggggggggggg

function* listBookSaga(action) {
  // See example in containers/HomePage/saga.js
  const requestURL = 'https://jsonplaceholder.typicode.com/posts';
  try {
    // Call our request helper (see 'utils/request')
    const getBook = yield call(request, requestURL);
    const addFields = getBook.map((item, idx) => {
      item.no = idx + 1;
      item.price = Math.floor(Math.random() * 100);
      return item;
    });
    action.isLoading = true;
    if (action.isLoading) {
      const listBooks = addFields.slice(action.offset, action.offset + 10);
      yield put(loadListBookSuccess(listBooks));
    }
  } catch (err) {
    yield put(loadListBookError(err));
  }
}

export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_LISTBOOK, listBookSaga);
  yield takeLatest(LOAD_LOADMORE, listBookSaga);
}
