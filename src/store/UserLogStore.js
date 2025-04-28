import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { datosUser, logaoutUser } from "../services/userServices";

export const useUsersLogStore = defineStore('usersLog', () => {

    const user = ref({
        id: null,
        nombre: '',
        email: '',
        telefono: '',
        rol: ''
    });

    const token = ref(localStorage.getItem('token') || '');

    const setUser = (userData) => {
        token.value = userData.token;
        localStorage.setItem('token', userData.token);
    };

    const getUser = async () => {
        if (!token.value) return;
        try {
            const userData = await datosUser();
            user.value = {
                id: userData.id,
                nombre: userData.nombre,
                email: userData.email,
                telefono: userData.telefono,
                rol: userData.rol
            };
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error.response?.data || error.message);
        }
    };


    watch(token, (newToken) => {
        if (newToken) {
            getUser();
        }
    }, { immediate: true });




    const logout = async () => {

        const logaoutrespose = await logaoutUser()
        if (logaoutrespose) {
            user.value = {
                id: null,
                nombre: '',
                email: '',
                telefono: '',
                rol: ''
            };
            token.value = '';
        }
        localStorage.removeItem('token');
    }

    return {
        setUser,
        user,
        token,
        getUser,
        logout
    };
});
