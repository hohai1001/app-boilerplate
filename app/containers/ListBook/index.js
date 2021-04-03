/* eslint-disable react/button-has-type */
/**
 *
 * ListBook
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectRepos } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadRepos } from './actions';

export function ListBook({ onClickGet, repos }) {
  useInjectReducer({ key: 'listBook', reducer });
  useInjectSaga({ key: 'listBook', saga });

  // console.log('data index', repos);

  return (
    <div>
      <Helmet>
        <title>ListBook</title>
        <meta name="description" content="Description of ListBook" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <p>
        <button onClick={() => onClickGet()}>GET</button>
      </p>
      {repos &&
        repos.length > 0 &&
        repos.map((item, idx) => (
          <div key={idx.toString()}>
            <p>{item.title}</p>
            <p>{item.body}</p>
          </div>
        ))}
    </div>
  );
}

ListBook.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onClickGet: PropTypes.func,
  repos: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  // listBook: makeSelectListBook(),
  repos: makeSelectRepos(),
});

function mapDispatchToProps(dispatch) {
  return {
    onClickGet: () => dispatch(loadRepos()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListBook);
