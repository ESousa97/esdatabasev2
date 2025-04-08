// src/utils/apiErrorHandler.js

import Router from 'next/router'

export function handleApiError(error) {
  const status = error?.response?.status

  if (status === 400) Router.push('/400')
  else if (status === 401) Router.push('/401')
  else if (status === 403) Router.push('/403')
  else if (status === 404) Router.push('/404')
  else if (status === 500) Router.push('/500')
  else if (status === 503) Router.push('/503')
  else Router.push(`/error?code=${status}`)
}
