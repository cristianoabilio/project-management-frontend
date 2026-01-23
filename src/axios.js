import axios from "axios";

const api = axios.create({
    baseURL: "http://laravel.test/api/"
});

export default api;