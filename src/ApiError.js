

class ApiError{
    message = null
    
    static from(error){
        return (error.response?.data).message
    }
}

export default ApiError