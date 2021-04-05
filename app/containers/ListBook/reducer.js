/* eslint-disable no-plusplus */
/*
 *
 * ListBook reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_LISTBOOK,
  LOAD_LISTBOOK_SUCCESS,
  LOAD_LISTBOOK_ERROR,
} from './constants';

export const initialState = {
  start: 0,
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
      case DEFAULT_ACTION:
        break;

      case LOAD_LISTBOOK:
        // action.isLoading = true;
        // console.log('action.isLoading', action.isLoading);
        break;

      case LOAD_LISTBOOK_SUCCESS:
        draft.loading = false;
        // console.log('reducer LOAD_LISTBOOK_SUCCESS', draft.loading);
        // draft.listBook.data = action.listBooks.map((item, idx) => {
        //   item.no = idx + 1;
        //   item.price = Math.floor(Math.random() * 100);
        //   return item;
        // });

        // draft.click += action.click;
        // draft.check += 1;
        // if (draft.click === draft.check) {
        //   draft.listBook.repositories.push(
        //     ...draft.listBook.data.slice(draft.start, draft.end),
        //   );
        //   draft.start += 10;
        //   draft.end += 10;
        // } else {
        //   draft.listBook.repositories.push(
        //     ...draft.listBook.data.slice(draft.start, draft.end),
        //   );
        // }
        draft.listBook.repositories.push(...action.listBooks);
        // console.log('action.listBooks', action.listBooks);
        break;

      case LOAD_LISTBOOK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      // case LOAD_LOADMORE:
      //   console.log('reducer LOAD_LOADMORE', draft.loading);
      //   draft.loading = true;
      //   break;
    }
  });

export default listBookReducer;
