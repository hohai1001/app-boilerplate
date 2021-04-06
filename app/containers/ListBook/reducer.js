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
  offset: 0,
  end: 10,
  click: 1,
  check: 1,
  loading: false,
  error: false,
  listBook: {
    repositories: [],
    data: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const listBookReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_LISTBOOK:
        draft.loading = true;
        if (action.isloading === true) {
          draft.offset += 10;
          action.offset = draft.offset;
        }
        break;

      case LOAD_LISTBOOK_SUCCESS:
        draft.loading = false;
        draft.listBook.repositories.push(...action.listBooks);
        break;

      case LOAD_LISTBOOK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default listBookReducer;
