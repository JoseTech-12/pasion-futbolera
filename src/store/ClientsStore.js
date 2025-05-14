import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getClients, createClient, deleteClient, getClientById, updateClient } from '../services/clientService'

export const useClientsStore = defineStore('clients', () => {
    const clients = ref([])
    const headers = ref([
        { title: 'id', value: 'id', sortable: false },
        { title: 'Nombre', value: 'nombre', sortable: false },
        { title: 'Email', value: 'email', sortable: false },
        { title: 'Telefono', value: 'telefono', sortable: false },
        { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }

    ])
    const getClientsData = async () => {
        try {
            const response = await getClients()
            clients.value = response.clientes
        } catch (error) {
            console.error('Error al obtener los clientes:', error.response?.data || error.message);
        }
    }

    const createClientData = async (client) => {
        try {
            const response = await createClient(client)
            clients.value.push(response.cliente)
        } catch (error) {
            console.error('Error al crear el cliente:', error.response?.data || error.message);
        }
    }
    const deleteClientData = async (id) => {
        try {
            await deleteClient(id)
            clients.value = clients.value.filter(client => client.id !== id)
        } catch (error) {
            console.error('Error al eliminar el cliente:', error.response?.data || error.message);
        }
    }
    const updateClientData = async (id, client) => {
        try {
            const response = await updateClient(id, client)
            const index = clients.value.findIndex(c => c.id === id)
            if (index !== -1) {
                clients.value[index] = response.cliente
            }
        } catch (error) {
            console.error('Error al actualizar el cliente:', error.response?.data || error.message);
        }
    }

    const getClientDataById = async (id) => {
        try {
            const response = await getClientById(id)
            return response
        } catch (error) {
            console.error('Error al obtener el cliente:', error.response?.data || error.message);
        }
    }


    getClientsData()

    return {
        clients,
        headers,
        createClientData,
        getClientsData,
        deleteClientData,
        updateClientData,
        getClientDataById
    }
})