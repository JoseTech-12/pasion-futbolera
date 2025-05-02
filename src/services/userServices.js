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

export const createUser = async (userData) => {

    try {
        const respose = await axios.post(`${api}/createUser`, userData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        return respose.data

    } catch (error) {
        console.error('Error al crear el usuario:', error.response?.data || error.message);
        throw error

    }
}


export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${api}/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.response?.data || error.message);
        throw error

    }

}

export const userShowId = async (id) => {
    try {
        const response = await axios.get(`${api}/userShow/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener el usuario por ID:', error.response?.data || error.message);
        throw error

    }
}



export const Update = async (id, userData) => {
    try {
        const response = await axios.put(`${api}/user/${id}`, userData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        console.error('Error al editar usuario', error.response.data || error.message)
        throw error

    }

}