import Error400 from '../../../pages/400'
import Error401 from '../../../pages/401'
import Error403 from '../../../pages/403'
import Error404 from '../../../pages/404'
import Error500 from '../../../pages/500'
import Error503 from '../../../pages/503'
import GenericError from './GenericError'

export default function ErrorGateway({ statusCode, error }) {
  if (statusCode === 400) return <Error400 />
  if (statusCode === 401) return <Error401 />
  if (statusCode === 403) return <Error403 />
  if (statusCode === 404) return <Error404 />
  if (statusCode === 500) return <Error500 />
  if (statusCode === 503) return <Error503 />
  return <GenericError statusCode={statusCode} error={error} />
}
