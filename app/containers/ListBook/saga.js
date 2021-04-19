/* eslint-disable no-param-reassign */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_LISTBOOK } from './constants';
import { loadListBookError, loadListBookSuccess } from './actions';
import { makeSelectLinkParams } from './selectors';
// import _get from 'lodash/get';

// Individual exports for testingggggggggggggg

function* listBookSaga(action) {
  // See example in containers/HomePage/saga.js
  const requestURL = 'https://jsonplaceholder.typicode.com/posts';

  try {
    // const { limit, offset } = yield select(makeSelectLinkParams());
    const { limit, offset } = yield select(makeSelectLinkParams());

    // let valueSearch;
    // if (action.text !== undefined) {
    //   valueSearch = action.text;
    // }
    // console.log('valueSearch', valueSearch);

    // Call our request helper (see 'utils/request')
    // console.log(`limit ${limit} ------ offset ${offset}`);
    const getBook = yield call(request, requestURL);

    // console.log('request', getBook);
    // console.log('action', action);
    const addFields = getBook.map((item, idx) => {
      item.no = idx + 1;
      item.price = Math.floor(Math.random() * 100);
      return item;
    });
    const listBook = addFields.slice(offset, limit + offset);
    let datas = [];

    if (action.text === undefined) {
      datas = listBook;
    } else {
      const fakeData = listBook.filter(
        item =>
          // console.log('aciton.text', action.text);
          item.title.toLowerCase().indexOf(action.text) !== -1,
      );
      if (fakeData !== undefined) {
        datas = fakeData;
      } else {
        datas = listBook;
      }
    }

    // console.log('datas', datas);

    // console.log('data', datas);

    // console.log('list', listBook);

    yield put(loadListBookSuccess(datas, action.isLoadMore));
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
}
