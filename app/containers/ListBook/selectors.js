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
    globalState => globalState.statusFlags.isLoadMore,
  );
const makeSelectIsCallApi = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.statusFlags.isCallApi,
  );

const makeSelectLinkParams = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.linkParams,
  );

const makeSelectError = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.linkParams.errorMessage,
  );

const makeSelectRepos = () =>
  createSelector(
    selectListBookDomain,
    globalState => globalState.listBook,
  );

export {
  selectListBookDomain,
  makeSelectListBook,
  makeSelectLoading,
  makeSelectLinkParams,
  makeSelectError,
  makeSelectRepos,
  makeSelectIsCallApi,
};
