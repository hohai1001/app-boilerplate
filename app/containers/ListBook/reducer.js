/*
 *
 * ListBook reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const listBookReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case LOAD_REPOS:
        // console.log('reducer --- LOAD_REPOS');
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        action.repos.no = 1;
        action.repos.price = 10;
        draft.userData.repositories = action.repos;
        // console.log('reducer --- LOAD_REPOS_SUCCESS', state);

        draft.loading = false;
        break;

      case LOAD_REPOS_ERROR:
        // console.log('reducer --- LOAD_REPOS_ERROR');
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default listBookReducer;
