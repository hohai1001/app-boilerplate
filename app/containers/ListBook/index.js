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
  makeSelectIsLoading,
  makeSelectLimit,
  makeSelectLoading,
  makeSelectOffset,
  makeSelectRepos,
  makeSelectIsButton,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadListBook } from './actions';
import Loading from '../loading';

export function ListBook({
  getListBook,
  listBook,
  isLoadMore,
  isCallApi,
  isLoding,
  offset,
  limit,
  isButton,
}) {
  useInjectReducer({ key: 'listBook', reducer });
  useInjectSaga({ key: 'listBook', saga });

  React.useEffect(() => {
    if (!isCallApi) getListBook(limit, offset, isLoadMore);
  }, [isCallApi]);
  // console.log(
  //   `limit ${limit} --- offset ${offset} --- isLoadMore ${isLoadMore}`,
  // );

  const [value, setValue] = React.useState('');

  const handleSearch = e => {
    e.preventDefault();
    if (value !== undefined) {
      getListBook(limit, offset, true, value);
    } else {
      getListBook(limit, 0);
    }
  };

  const handleGetValue = e => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>ListBook</title>
        <meta name="description" content="Description of ListBook" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}
      <br />
      <form onSubmit={handleSearch} style={{ textAlign: 'center' }}>
        <input
          type="text"
          name="search"
          onChange={handleGetValue}
          style={{ width: '500px' }}
        />
        <button>Search</button>
      </form>
      <br />
      {isLoding ? (
        <div>
          <table style={{ border: '1px solid black', width: '100%' }}>
            {/* <tr style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black', width: '10%' }}>No</td>
              <td style={{ border: '1px solid black', width: '30%' }}>Title</td>
              <td style={{ border: '1px solid black', width: '50%' }}>
                Description
              </td>
              <td style={{ border: '1px solid black', width: '10%' }}>Price</td>
            </tr> */}
            {listBook &&
              listBook.length > 0 &&
              listBook.map((item, idx) => (
                <tr key={idx.toString()} style={{ border: '1px solid black' }}>
                  <td style={{ border: '1px solid black', width: '10%' }}>
                    {idx + 1}
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
          {isButton ? (
            ''
          ) : (
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
                <button onClick={() => getListBook(limit, offset, true)}>
                  Load more
                </button>
              )}
            </div>
          )}
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
  isLoding: PropTypes.bool,
  limit: PropTypes.number,
  offset: PropTypes.number,
  isButton: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // listBook: makeSelectListBook(),
  listBook: makeSelectRepos(),
  isLoadMore: makeSelectLoading(),
  isCallApi: makeSelectIsCallApi(),
  isLoding: makeSelectIsLoading(),
  limit: makeSelectLimit(),
  offset: makeSelectOffset(),
  isButton: makeSelectIsButton(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListBook: (limit, offset, isLoadMore, text) =>
      dispatch(loadListBook(limit, offset, isLoadMore, text)),
    isCall: () => dispatch(loadListBook()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListBook);
