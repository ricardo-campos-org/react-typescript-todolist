import { API_TOKEN } from '../app-constants/app-constants';

const tokenState = localStorage.getItem(API_TOKEN);

function handleError(httpStatusCode: number) {
  if (httpStatusCode === 403) {
    throw new Error('Forbidden! Access denied');
  }
  if (httpStatusCode === 500) {
    throw new Error('Internal Server Error!');
  }
  throw new Error('Unknown error');
}

const api = {
  getJSON: async (url: string) => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenState}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      handleError(response.status);
    }
  }
}

export default api;
