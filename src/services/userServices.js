import axios from 'axios'

const api = "http://127.0.0.1:8000/api";

export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${api}/loginUser`, userData)
        return response.data
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        throw error
    }

}
export const datosUser = async () => {
    try {
        const response = await axios.get(`${api}/user`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error.response?.data || error.message);
        throw error
    }
}



export const logaoutUser = async () => {
    try {
        const response = await axios.post(`${api}/logoutUser`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al cerrar sesión:', error.response?.data || error.message);
        throw error

    }

}


export const getUsers = async () => {
    try {
        const response = await axios.get(`${api}/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.response?.data || error.message);
        throw error
    }
}