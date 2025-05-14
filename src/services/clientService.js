import axios from "axios";

const api = "http://127.0.0.1:8001/api"

export const getClients = async () => {
    try {
        const response = await axios.get(`${api}/clients`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data

    } catch (error) {
        console.error('Error al obtener los clientes:', error.response?.data || error.message);
        throw error

    }
}


export const createClient = async (client) => {
    try {
        const response = await axios.post(`${api}/createClient`, client, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al crear el cliente:', error.response?.data || error.message);
        throw error
    }
}


export const deleteClient = async (id) => {
    try {
        const response = await axios.delete(`${api}/deleteClient/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar el cliente:', error.response?.data || error.message);
        throw error
    }
}

export const updateClient = async (id, client) => {
    try {
        const response = await axios.put(`${api}/updateClient/${id}`, client, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al actualizar el cliente:', error.response?.data || error.message);
        throw error
    }
}
export const getClientById = async (id) => {
    try {
        const response = await axios.get(`${api}/showClient/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener el cliente:', error.response?.data || error.message);
        throw error
    }
}