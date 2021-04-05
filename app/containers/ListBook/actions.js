/*
 *
 * ListBook actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_LISTBOOK,
  LOAD_LISTBOOK_SUCCESS,
  LOAD_LISTBOOK_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadListBook(offset = 0, isLoading) {
  // console.log('action --- loadRepos');
  return {
    type: LOAD_LISTBOOK,
    offset,
    loading: isLoading,
  };
}

export function loadListBookSuccess(
  listBooks = [],
  start = 0,
  end = 10,
  click = 1,
) {
  // console.log('action --- loadListBookSuccess');
  return {
    type: LOAD_LISTBOOK_SUCCESS,
    listBooks,
    start,
    end,
    click,
  };
}

export function loadListBookError(error) {
  // console.log('action --- repoLoadingError');
  return {
    type: LOAD_LISTBOOK_ERROR,
    error,
  };
}

// export function loadLoadMore(start = 0, end = 0) {
//   // console.log('action --- loadRepos');
//   return {
//     type: LOAD_LOADMORE,
//     start,
//     end,
//   };
// }
