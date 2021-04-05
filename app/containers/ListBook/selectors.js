import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listBook state domain
 */

const selectListBookDomain = state => state.listBook || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListBook
 */

const makeSelectListBook = () =>
  createSelector(
    selectListBookDomain,
    substate => substate,
  );

const makeSelectLoading = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.listBook.repositories,
  );

// export default makeSelectListBook;
// export { selectListBookDomain };

export {
  selectListBookDomain,
  makeSelectListBook,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
};
