<script setup>

const opciones = ["Administrador", "Cajero", "Contador"]
import { ref, defineProps } from 'vue'
import { createUser } from '../services/userServices';
import { useUserStore } from '../store/UserStore.js';
import { useRouter } from 'vue-router'
const router = useRouter()
import { watch } from 'vue';

const store = useUserStore()


const props = defineProps({
    title: {
        type: String,
        default: 'Crear nuevo Usuario'
    },
    userShowId: {
        type: Object,
        default: null
    }
})

const nombre = ref('')
const email = ref('')
const telefono = ref('')
const password = ref('')
const seleccion = ref(null)
const dialog = ref(false)
const textPassword = ref('Password')
const textButton = ref('Agregar Usuario')
const passwordVisible = ref(false)
const textSuccess = ref('El usuario se ha creado correctamente')



if (props.userShowId) {
    textPassword.value = 'Nueva contraseña'
    textButton.value = 'Actualizar Usuario'
    textSuccess.value = 'El usuario se ha actualizado correctamente'
}

watch(() => props.userShowId, (newVal) => {
    if (newVal) {
        nombre.value = newVal.nombre || ''
        email.value = newVal.email || ''
        telefono.value = newVal.telefono || ''
        seleccion.value = newVal.rol || null
    }
}, { immediate: true })

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
        if (props.userShowId && value === '') return true

        if (!value) return 'La contraseña es requerida'
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'

        return true
    }
]
const nombreRules = [
    (value) => {
        if (value) return true
        return 'El nombre es requerido'
    },
    (value) => {
        if (value.length >= 6) return true
        return 'El nombre debe tener al menos 6 caracteres'
    },
    (value) => {
        if (value.length <= 20) return true
        return 'El nombre no puede tener más de 20 caracteres'
    },
    (value) => {
        if (/^[a-zA-Z\s]+$/.test(value)) return true
        return 'El nombre solo puede contener letras y espacios'
    },
]
const telefonoRules = [
    (value) => {
        if (value) return true
        return 'El telefono es requerido'
    },
    (value) => {
        if (value.length === 10) return true
        return 'El telefono debe tener 10 digitos'
    },
    (value) => {
        if (/^\d+$/.test(value)) return true
        return 'El telefono solo puede contener números'
    },
]
const rolRules = [
    (value) => {
        if (value) return true
        return 'El rol es requerido'
    },
]
const crearUsuario = async () => {
    const userData = {
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value,
        password: password.value,
        rol: seleccion.value
    }


    if (props.userShowId) {
        if (password.value === '') {
            delete userData.password
        }
        userData.id = props.userShowId.id
        const id = props.userShowId.id
        console.log(userData)

        try {
            const response = await store.updateUser(id, userData)
            console.log('Usuario actualizado:', response.data)
            dialog.value = true
        } catch (error) {
            console.error('Error al actualizar el usuario:', error)
            return
        }
    }

    if (!props.userShowId) {

        try {
            const response = await createUser(userData)
            console.log('Usuario creado:', response.data)
            dialog.value = true

        } catch (error) {
            console.error('Error al crear el usuario:', error)
        }
    }

}
const aceptar = () => {
    dialog.value = false
    router.push({ name: 'administrar-usuarios' })
}


const pressEyePassword = () => {
    passwordVisible.value = !passwordVisible.value
}
</script>

<template>
    <Header />

    <div class="conten-form">
        <h1>{{ props.title }}</h1>
        <form @submit.prevent="crearUsuario">

            <v-text-field class="input" v-model="nombre" :rules="nombreRules" label="nombre" required></v-text-field>
            <v-text-field class="input" v-model="email" :rules="emailRules" label="Email" required></v-text-field>
            <v-text-field class="input" v-model="telefono" :counter="10" :rules="telefonoRules" label="Telefono"
                required></v-text-field>
            <v-text-field class="input" v-model="password" :rules="passwordRules" :label="textPassword"
                :type="passwordVisible ? 'text' : 'password'">
                <template #append>

                    <v-icon @click="pressEyePassword" v-if="password.length > 0">
                        {{ passwordVisible ? 'mdi-eye-off' : 'mdi-eye' }}
                    </v-icon>
                </template></v-text-field>
            <v-select class="input" v-model="seleccion" :rules="rolRules" :items="opciones" label="Rol"
                outlined></v-select>
            <v-btn class="btn-agregar btn-add" type="submit" elevation="2">
                <v-icon>mdi-plus</v-icon>
                <span>{{ textButton }}</span>
            </v-btn>
        </form>
    </div>

    <v-dialog v-model="dialog" persistent max-width="400px">
        <v-card>
            <v-card-title class="headline">!Exito</v-card-title>
            <v-card-text>
                {{ textSuccess }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="aceptar" color="green">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
.v-dialog {
    z-index: 9999;
}

.conten-form {
    background-color: $color-secondary;
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin: 40px auto;

    color: white;
    margin: 40px;
    gap: 30px;

    h1 {
        text-align: center;
    }

}

::v-deep(.v-counter) {
    color: white;
    font-weight: bold;
}

form {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
    padding: 30px;
}


form .input {
    width: calc(50% - 15px);
}

@media (max-width: 600px) {
    form>.input {
        width: 100%;
    }

    .conten-form {
        width: 100%;
        margin: 0;


    }


}

.btn-add {
    margin-left: 0;
    margin-top: 20px;

    width: 100%;
}
</style>