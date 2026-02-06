// pages/_error.js

import PropTypes from 'prop-types';
import ErrorGateway from '../src/components/Common/ErrorGateway';

function Error({ statusCode, err }) {
  return <ErrorGateway statusCode={statusCode} error={err} />;
}

Error.propTypes = {
  statusCode: PropTypes.number,
  err: PropTypes.object,
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode, err };
};

export default Error;
