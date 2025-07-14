import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pingBackend = async () => {
  try {
    const response = await api.get('/ping');
    return response.data;
  } catch {
    throw new Error('Error conectando con el backend');
  }
};

export const createVisit = async (visitData: {
  ip: string;
  country?: string;
  page: string;
}) => {
  try {
    const response = await api.post('/visits', visitData);
    return response.data;
  } catch {
    throw new Error('Error creando visita');
  }
};

export const getVisits = async () => {
  try {
    const response = await api.get('/visits');
    return response.data;
  } catch {
    throw new Error('Error obteniendo visitas');
  }
};

export default api; 