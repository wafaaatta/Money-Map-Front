import axios from "axios";
import { getAuthenticationToken } from "./authentication";
import { apiUrl } from "../constants/app_constants";

const axiosHttp = axios.create({
    baseURL: `${apiUrl}`,
});

axiosHttp.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    const auth_token = getAuthenticationToken()
    config.headers['Authorization'] = `Bearer ${auth_token}`
    
    return config;
},(error) => {
    return Promise.reject(error);
})

axiosHttp.interceptors.response.use((response) => {    
    return response
}, (error) => {
    if(error.response.status === 403) {
        window.location.href = `/login?redirected=true&redirected_from=${window.location.pathname}`
    }

    return Promise.reject(error);   
    
})


export default axiosHttp