import axios from 'axios';

// Base URL from env or fallback
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Attach Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    try {
      const token = window?.localStorage?.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_) {
      // ignore storage errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ Admin ============
export const loginAdmin = (credentials) => api.post('admin/login', credentials);
export const registerAdmin = (payload) => api.post('admin/signup', payload);

// ============ Teachers ============
export const getTeachers = () => api.get('/teachers');
export const createTeacher = (payload) => api.post('/teachers', payload);
export const updateTeacher = (id, payload) => api.put(`/teachers/${id}`, payload);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// ============ Classrooms ============
export const getClassrooms = () => api.get('/api/classrooms');
export const createClassroom = (payload) => api.post('/api/classrooms', payload);
export const updateClassroom = (id, payload) => api.put(`/api/classrooms/${id}`, payload);
export const deleteClassroom = (id) => api.delete(`/api/classrooms/${id}`);

// ============ Divisions ============
export const getDivisions = () => api.get('/api/divisions');
export const createDivision = (payload) => api.post('/api/divisions', payload);
export const updateDivision = (id, payload) => api.put(`/api/divisions/${id}`, payload);
export const deleteDivision = (id) => api.delete(`/api/divisions/${id}`);

// ============ Subjects ============
export const getSubjects = () => api.get('/api/subjects');
export const createSubject = (payload) => api.post('/api/subjects', payload);
export const updateSubject = (id, payload) => api.put(`/api/subjects/${id}`, payload);
export const deleteSubject = (id) => api.delete(`/api/subjects/${id}`);

// ============ Settings ============
export const getSettings = () => api.get('/api/settings');
export const updateSettings = (payload) => api.put('/api/settings', payload);

export default api;


