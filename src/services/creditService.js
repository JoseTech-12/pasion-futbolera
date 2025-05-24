import axios from "axios";

const api = "http://127.0.0.1:8004/api"


export const getCredits = async () => {
    try {
        const response = await axios.get(`${api}/credits`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener los creditos:', error.response?.data || error.message);
        throw error
    }
}

export const createCredit = async (credit) => {
    try {
        const response = await axios.post(`${api}/credits`, credit, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {

        throw error;  // Lanzar error para que sea capturado en Vue
    }
}



export const payCredit = async (creditId) => {
    try {
        const response = await axios.put(`${api}/credits/${creditId}/pagar`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al pagar el credito:', error.response?.data || error.message);
        throw error
    }
}


export const deleteCredit = async (creditId) => {
    try {
        const response = await axios.delete(`${api}/credits/${creditId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al eliminar el credito:', error.response?.data || error.message);
        throw error
    }
}
export const getCreditById = async (client_id) => {
    try {
        const response = await axios.get(`${api}/credits/client/${client_id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    }
    catch (error) {
        console.error('Error al obtener el credito:', error.response?.data || error.message);
        throw error
    }
}

export const deleteCreditById = async (creditId) => {
    try {
        const response = await axios.delete(`${api}/credits/${creditId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar el credito:', error.response?.data || error.message);
        throw error
    }

}



