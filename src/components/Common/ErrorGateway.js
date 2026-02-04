import Error400 from '../../../pages/400';
import Error401 from '../../../pages/401';
import Error403 from '../../../pages/403';
import Error404 from '../../../pages/404';
import Error500 from '../../../pages/500';
import Error503 from '../../../pages/503';
import GenericError from './GenericError';
import PropTypes from 'prop-types';

const errorComponents = new Map([
  [400, Error400],
  [401, Error401],
  [403, Error403],
  [404, Error404],
  [500, Error500],
  [503, Error503],
]);

export default function ErrorGateway({ statusCode, error }) {
  const SpecificError = errorComponents.get(statusCode);

  if (SpecificError) {
    return <SpecificError />;
  }

  return <GenericError statusCode={statusCode} error={error} />;
}

ErrorGateway.propTypes = {
  statusCode: PropTypes.number,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Error)]),
};

ErrorGateway.defaultProps = {
  statusCode: 500,
  error: null,
};
