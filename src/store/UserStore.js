import { defineStore } from 'pinia';
import { getUsers, deleteUser, userShowId, Update } from '../services/userServices';
import { ref, computed } from 'vue';



export const useUserStore = defineStore('user', () => {

    const users = ref([]);
    const error = ref(null);

    const headers = ref([
        { title: 'Nombre', key: 'nombre' },
        { title: 'email', key: 'email' },
        { title: 'Rol', key: 'rol' },
        { title: 'telefono', key: 'telefono' },
        { title: 'Acciones', key: 'acciones' }
    ]);
    const fetchUsers = async () => {
        error.value = null;
        try {
            users.value = await getUsers();
        } catch (err) {
            error.value = err.message || 'Error fetching users';
        }
    };

    const deleteUserById = async (id) => {
        error.value = null;
        try {
            await deleteUser(id);
            users.value = users.value.filter(user => user.id !== id);
        } catch (err) {
            error.value = err.message || 'Error deleting user';
        }
    }

    const userShow = async (id) => {
        error.value = null;
        try {
            const user = await userShowId(id);
            return user;
        } catch (err) {
            error.value = err.message || 'Error fetching user';
        }
    }

    const updateUser = async (id, userData) => {
        error.value = null;
        try {
            const updatedUser = await Update(id, userData);
            if (!updatedUser) throw new Error('No se recibió el usuario actualizado');
            users.value = users.value.map(user => user.id === id ? updatedUser : user);
            return updatedUser
        } catch (err) {
            error.value = err.message || 'Error updating user';
            throw err;
        }
    }


    return { users, error, fetchUsers, headers, deleteUserById, userShow, updateUser };

})