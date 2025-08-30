import axios from "axios";

const api = axios.create({
    // baseURL:'http://127.0.0.1:8000/',       // Django API base URL
    baseURL:'https://django-react-store-32k3.onrender.com/',       // Django API base URL
    header : {
        "Content-Type" : "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try{
                const refreshToken = localStorage.getItem('refresh');
                const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/',{
                    refresh:refreshToken
                });

                localStorage.setItem('access',res.data.access);
                api.defaults.headers.Authorization = `Bearer ${res.data.access}`;
                return api(originalRequest);
            } catch(error){
                console.error("Refresh token expired, logging out");
                localStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default api;