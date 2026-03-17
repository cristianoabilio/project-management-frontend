import api from "../axios";

// handle login
export const loginService = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response;
}

// handle register
export const registerService = async (userData) => {
    const response = await api.post('/register', userData);
    return response;
}