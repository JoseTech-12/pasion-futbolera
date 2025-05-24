import axios from 'axios'

const api = "http://127.0.0.1:8003/api";

export const getSales = async () => {
    try {
        const response = await axios.get(`${api}/sales`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener las ventas:', error.response?.data || error.message);
        throw error
    }
}
export const getSale = async (id) => {
    try {
        const response = await axios.get(`${api}/sales/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener la venta:', error.response?.data || error.message);
        throw error
    }
}
export const createSale = async (saleData) => {
    try {
        const response = await axios.post(`${api}/createSale`, saleData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al crear la venta:', error.response?.data || error.message);
        throw error
    }
}
export const updateSale = async (id, saleData) => {
    try {
        const response = await axios.put(`${api}/sales/${id}`, saleData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al actualizar la venta:', error.response?.data || error.message);
        throw error
    }
}
export const deleteSale = async (id) => {
    try {
        const response = await axios.delete(`${api}/deleteSale/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al eliminar la venta:', error.response?.data || error.message);
        throw error
    }
}


