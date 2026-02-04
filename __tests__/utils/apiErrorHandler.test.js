import { handleApiError, isNetworkError, isAuthError } from '../../src/utils/apiErrorHandler';

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    push: (path) => mockPush(path),
  },
}));

describe('apiErrorHandler', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('handleApiError', () => {
    it('redirects to /404 for 404 errors', () => {
      const error = { response: { status: 404 } };
      handleApiError(error);
      expect(mockPush).toHaveBeenCalledWith('/404');
    });

    it('redirects to /401 for 401 errors', () => {
      const error = { response: { status: 401 } };
      handleApiError(error);
      expect(mockPush).toHaveBeenCalledWith('/401');
    });

    it('redirects to /500 for 500 errors', () => {
      const error = { response: { status: 500 } };
      handleApiError(error);
      expect(mockPush).toHaveBeenCalledWith('/500');
    });

    it('redirects to generic error page for unknown status', () => {
      const error = { response: { status: 418 } };
      handleApiError(error);
      expect(mockPush).toHaveBeenCalledWith('/erro?code=418');
    });

    it('does not redirect when redirect option is false', () => {
      const error = { response: { status: 404 } };
      handleApiError(error, { redirect: false });
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('returns error info object', () => {
      const error = {
        response: {
          status: 404,
          data: { message: 'Not found' },
        },
      };
      const result = handleApiError(error, { redirect: false });
      expect(result).toHaveProperty('status', 404);
      expect(result).toHaveProperty('message', 'Not found');
      expect(result).toHaveProperty('timestamp');
    });
  });

  describe('isNetworkError', () => {
    it('returns true for network errors', () => {
      const error = { message: 'Network Error' };
      expect(isNetworkError(error)).toBe(true);
    });

    it('returns false for non-network errors', () => {
      const error = { response: { status: 500 } };
      expect(isNetworkError(error)).toBe(false);
    });
  });

  describe('isAuthError', () => {
    it('returns true for 401 errors', () => {
      const error = { response: { status: 401 } };
      expect(isAuthError(error)).toBe(true);
    });

    it('returns true for 403 errors', () => {
      const error = { response: { status: 403 } };
      expect(isAuthError(error)).toBe(true);
    });

    it('returns false for non-auth errors', () => {
      const error = { response: { status: 500 } };
      expect(isAuthError(error)).toBe(false);
    });
  });
});
