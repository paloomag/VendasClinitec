import axios from 'axios'

const api = axios.create({
    baseURL: 'https://apitec.clinitec.com.br/v4/vendas/',
    headers: {
        'Authorization': 'c0cf95374584a37d69d1d96288644d5a2b0fbe6d',
    }
});
export default api;