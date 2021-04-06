/* eslint-disable no-alert */
/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
/*
 *
 * ListBook reducer
 *
 */
import produce from 'immer';
import {
  LOAD_LISTBOOK,
  LOAD_LISTBOOK_SUCCESS,
  LOAD_LISTBOOK_ERROR,
} from './constants';

export const initialState = {
  listBook: [],
  linkParams: {
    limit: 10,
    offset: 0,
    errorMessage: '',
  },
  statusFlags: {
    isLoadMore: false,
    isCallApi: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const listBookReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_LISTBOOK:
        // console.log('reducer ---- LOAD_LISTBOOK', action.isLoadMore);
        draft.statusFlags.isCallApi = true;
        if (action.isLoadMore === false) {
          draft.linkParams.offset = initialState.linkParams.offset;
        } else {
          draft.statusFlags.isLoadMore = true;
          draft.linkParams.offset =
            state.linkParams.offset + state.linkParams.limit;
        }
        break;

      case LOAD_LISTBOOK_SUCCESS:
        const data = action.listBook;
        let list = [];

        // console.log('reducer ---- LOAD_LISTBOOK_SUCCESS', action.listBook);

        if (action.isLoadMore === false) {
          list = data;
        } else {
          draft.statusFlags.isLoadMore = false;
          list = [...state.listBook, ...data];
        }

        draft.listBook = list;

        // draft.loading = false;
        // draft.listBook.push(...action.listBooks);

        break;

      case LOAD_LISTBOOK_ERROR:
        // console.log('reducer ---- LOAD_LISTBOOK_ERROR');
        draft.linkParams.offset = state.linkParams.offset;
        if (action.isLoadMore === false) {
          draft.listReport = initialState.listReport;
        } else {
          draft.statusFlags.isLoadMore = false;
          alert('Gọi API thất bại !');
        }
        // draft.error = action.error;
        // draft.loading = false;
        break;
    }
  });

export default listBookReducer;
