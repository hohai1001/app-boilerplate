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

export function loadListBook(offset = 0, isloading) {
  // console.log('action --- loadRepos');
  return {
    type: LOAD_LISTBOOK,
    offset,
    isloading,
  };
}

export function loadListBookSuccess(listBooks = []) {
  // console.log('action --- loadListBookSuccess');
  return {
    type: LOAD_LISTBOOK_SUCCESS,
    listBooks,
  };
}

export function loadListBookError(error) {
  // console.log('action --- repoLoadingError');
  return {
    type: LOAD_LISTBOOK_ERROR,
    error,
  };
}
