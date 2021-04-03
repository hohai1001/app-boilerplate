/*
 *
 * ListBook actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadRepos() {
  // console.log('action --- loadRepos');
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos) {
  // console.log('action --- reposLoaded');
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
  };
}

export function repoLoadingError(error) {
  // console.log('action --- repoLoadingError');
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
