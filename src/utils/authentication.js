export const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    return token != null;
}

export const getAuthenticationToken = () => {
    return localStorage.getItem('token')
}

export const saveAuthenticationToken = (token) => {
    localStorage.setItem('token', token)
}

export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}