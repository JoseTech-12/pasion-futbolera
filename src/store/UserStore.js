import { defineStore } from 'pinia';
import { getUsers } from '../services/userServices';
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

    return { users, error, fetchUsers, headers };

})