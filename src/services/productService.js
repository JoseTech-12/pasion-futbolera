import axios from "axios";
const api = "http://127.0.0.1:8002/api";


export const getProducts = async () => {
    try {
        const response = await axios.get(`${api}/product`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al obtener los productos:', error.response?.data || error.message);
        throw error
    }
}

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${api}/createProduct`, product, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al crear el producto:', error.response?.data || error.message);
        throw error
    }

}


export const deleteProductById = async (id) => {
    try {
        const response = await axios.delete(`${api}/deleteProduct/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error.response?.data || error.message);
        throw error
    }
}

export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${api}/updateProduct/${id}`, product, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al actualizar el producto:', error.response?.data || error.message);
        throw error
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${api}/showProduct/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al obtener el producto:', error.response?.data || error.message);
        throw error
    }
}