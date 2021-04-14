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

export function loadListBook(limit, offset, isLoadMore = false, text) {
  // console.log('action --- loadListBook');
  return {
    type: LOAD_LISTBOOK,
    limit,
    offset,
    isLoadMore,
    text,
  };
}

export function loadListBookSuccess(listBook, isLoadMore = false) {
  // console.log('action --- loadListBookSuccess');
  return {
    type: LOAD_LISTBOOK_SUCCESS,
    listBook,
    isLoadMore,
  };
}

export function loadListBookError(error = '', isLoadMore = false) {
  // console.log('action --- loadListBookError');
  return {
    type: LOAD_LISTBOOK_ERROR,
    error,
    isLoadMore,
  };
}
