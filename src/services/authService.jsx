import api from "../axios";

// handle login
export const loginService = async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
}