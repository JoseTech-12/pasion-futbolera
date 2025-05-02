<script setup>
import { ref } from 'vue'
import { loginUser } from "../services/userServices.js"
import { useUsersLogStore } from "../store/UserLogStore.js"
import { storeToRefs } from 'pinia';
import router from '../router/index.js';

const store = useUsersLogStore();
const alert = ref(false)




const valid = ref(false)
const email = ref('')
const password = ref('')

const emailRules = [
    (value) => {
        if (value) return true
        return 'Email es requerido'
    },
    (value) => {
        if (/.+@.+\..+/.test(value)) return true
        return 'Email no es valido'
    },
]

const passwordRules = [
    (value) => {
        if (value) return true
        return 'La contraseña es requerida'
    }

]

const loggear = async () => {

    if (!valid.value) {
        alert.value = true
        return
    }

    try {
        const userData = {
            email: email.value,
            password: password.value
        }
        const response = await loginUser(userData)
        store.setUser(response);
        localStorage.setItem('token', response.token);
        await store.getUser();
        router.push({ name: 'pasion-futbolera' })

    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data?.message || error.message)
        alert.value = true
    }

}
</script>

<template>



    <v-form class="form" v-model="valid">
        <h1>Pasion Futbolera</h1>
        <div class="conten-login">
            <h3>Inicio de sesion</h3>
            <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password"
                required></v-text-field>
            <v-alert v-model="alert" type="error" dismissible>Usuario o contraseña incorrectos</v-alert>
            <v-btn class="btn" @click="loggear">Iniciar sesion</v-btn>

        </div>
    </v-form>
</template>


<style scoped lang="scss">
.form {
    background-color: $color-primary;
    color: white;
    height: 100vh;
    padding: 30px;

    h3,
    h1 {
        text-align: center;
    }
}

.conten-login {
    width: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: $color-secondary;
    padding: 40px;
    border: solid 1px white;
    border-radius: 10px;
    margin-top: 100px;

}
</style>