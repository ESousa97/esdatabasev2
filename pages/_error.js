// pages/_error.js

import PropTypes from 'prop-types'
import ErrorGateway from '../src/components/Common/ErrorGateway'

function Error({ statusCode, err }) {
  return <ErrorGateway statusCode={statusCode} error={err} />
}

Error.propTypes = {
  statusCode: PropTypes.number,
  err: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Error)]),
}

Error.defaultProps = {
  statusCode: 500,
  err: null,
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500
  return { statusCode, err }
}

export default Error
