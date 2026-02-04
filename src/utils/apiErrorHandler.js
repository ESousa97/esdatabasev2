/**
 * API Error Handler
 *
 * Handles API errors and redirects to appropriate error pages.
 */
import Router from 'next/router';

const ERROR_ROUTES = {
  400: '/400',
  401: '/401',
  403: '/403',
  404: '/404',
  500: '/500',
  503: '/503',
};

/**
 * Handle API errors by redirecting to appropriate error pages
 * @param {Error} error - The error object from API call
 * @param {Object} options - Optional configuration
 * @param {boolean} options.redirect - Whether to redirect (default: true)
 * @returns {Object} - Error info object
 */
export function handleApiError(error, options = { redirect: true }) {
  const status = error?.response?.status || error?.status;
  const message = error?.response?.data?.message || error?.message || 'Unknown error';

  const errorInfo = {
    status,
    message,
    timestamp: new Date().toISOString(),
  };

  if (options.redirect) {
    const route = ERROR_ROUTES[status] || `/erro?code=${status}`;
    Router.push(route);
  }

  return errorInfo;
}

/**
 * Check if error is a network error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export function isNetworkError(error) {
  return !error?.response && error?.message === 'Network Error';
}

/**
 * Check if error is an authentication error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export function isAuthError(error) {
  const status = error?.response?.status;
  return status === 401 || status === 403;
}

export default handleApiError;
