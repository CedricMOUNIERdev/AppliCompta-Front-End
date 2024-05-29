import axios from 'axios'

const apiUrl ="https://localhost:58904/api"

const apiService = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

// Fonction pour définir le token d'accès dans les en-têtes
const setToken = (token: string | null) => {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export {apiService,apiUrl, setToken };





