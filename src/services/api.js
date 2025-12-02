import axios from "axios";

const apiClient = axios.create({
    // A MÁGICA ACONTECE AQUI:
    // Tenta ler a variável da Vercel. Se não existir (null/undefined), usa o localhost.
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/",
    headers: {
        "Content-type": "application/json"
    }
});

// Interceptor para adicionar o Token automaticamente
apiClient.interceptors.request.use(
    (config) => {
        // O localStorage só existe no navegador, então verificamos se window está definido
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;