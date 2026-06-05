export const API_PERU_BASE_URL = 'https://apiperu.dev/api';

export const API_PERU_TOKEN = '9a04b38ede219a1bcce55281cdb0210550ba809529b7256815aee63aa7bdb37a';

export const getApiPeruHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_PERU_TOKEN}`
});
