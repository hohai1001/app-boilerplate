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
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectIsCallApi,
  makeSelectLoading,
  makeSelectRepos,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadListBook } from './actions';
import Loading from '../loading';

export function ListBook({ getListBook, listBook, isLoadMore, isCallApi }) {
  useInjectReducer({ key: 'listBook', reducer });
  useInjectSaga({ key: 'listBook', saga });

  React.useEffect(() => {
    if (!isCallApi) getListBook();
  }, [isCallApi]);

  return (
    <div>
      <Helmet>
        <title>ListBook</title>
        <meta name="description" content="Description of ListBook" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}

      {isCallApi ? (
        <div>
          <table style={{ border: '1px solid black', width: '100%' }}>
            <tr style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black', width: '10%' }}>No</td>
              <td style={{ border: '1px solid black', width: '30%' }}>Title</td>
              <td style={{ border: '1px solid black', width: '50%' }}>
                Description
              </td>
              <td style={{ border: '1px solid black', width: '10%' }}>Price</td>
            </tr>
            {listBook &&
              listBook.length > 0 &&
              listBook.map((item, idx) => (
                <tr key={idx.toString()} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black', width: '10%' }}>
                    {item.no}
                  </td>
                  <td style={{ border: '1px solid black', width: '30%' }}>
                    {item.title}
                  </td>
                  <td style={{ border: '1px solid black', width: '50%' }}>
                    {item.body}
                  </td>
                  <td style={{ border: '1px solid black', width: '10%' }}>
                    {item.price} $
                  </td>
                </tr>
              ))}
          </table>

          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoadMore ? (
              <Loading />
            ) : (
              <button onClick={() => getListBook(true)}>Load more</button>
            )}
          </div>
          <br />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
}

ListBook.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  getListBook: PropTypes.func,
  listBook: PropTypes.any,
  isLoadMore: PropTypes.bool,
  isCallApi: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // listBook: makeSelectListBook(),
  listBook: makeSelectRepos(),
  isLoadMore: makeSelectLoading(),
  isCallApi: makeSelectIsCallApi(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListBook: isLoadMore => dispatch(loadListBook(isLoadMore)),
    isCall: () => dispatch(loadListBook()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListBook);
