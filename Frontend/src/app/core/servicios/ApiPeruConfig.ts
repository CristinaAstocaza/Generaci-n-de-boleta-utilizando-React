export const API_PERU_BASE_URL = 'https://apiperu.dev/api';

export const API_PERU_TOKEN = 'TOKEN_DEMO';

export const getApiPeruHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_PERU_TOKEN}`
});
