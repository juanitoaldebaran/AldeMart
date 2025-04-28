import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(new Error('Authentication failed. Please log in again'));
            } else if (error.request) {
                return Promise.reject(new Error(error.response.data.message || 'An error has occured on fetching response'));
            } else {
                return Promise.reject(new Error(error.message || 'An unexpected error occured'));
            }
        }
    }
)

const authApi = {
    signUp: async (email, password) => {
        try {
            const response = await api.post('/signup', { email, password });
            const data = response.data;

            return data;
        } catch (error) {
            console.log(error);
        }
    },

    signIn: async (email, password) => {
        try {
            const response = await api.post('/signin', {email, password});
            const data = response.data;
            
            return data;
        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/me');
            const data = response.data;

            return data;
        } catch (error) {
            throw error;
        }
    },

    signOut: () => {
        localStorage.removeItem('token');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
}

export default authApi;