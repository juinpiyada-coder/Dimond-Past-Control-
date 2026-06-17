const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: getAuthHeaders(),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok || (data && data.error)) {
    const error = (data && data.error) || response.statusText;
    throw new Error(error);
  }

  return data;
};

// Simple in-memory cache
const cache = new Map();

export const fetchCached = async (url) => {
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    // Cache for 5 minutes (300000 ms)
    if (Date.now() - timestamp < 300000) {
      return data;
    }
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
};
