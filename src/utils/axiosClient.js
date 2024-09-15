import axios from "axios";

const axiosHttp = axios.create({
    //baseURL: `http://127.0.0.1:8000/api`, old
    baseURL: `http://45.77.61.207/api`, //new
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
});

axiosHttp.interceptors.request.use((config) => {
    console.log('inside request intercept');
    
    const auth_token = localStorage.getItem('token')
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