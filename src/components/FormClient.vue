<script setup>
import { ref, defineProps } from 'vue';
import { useClientsStore } from '../store/ClientsStore';
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue';
import { watch } from 'vue';
const router = useRouter();
const store = useClientsStore();

const props = defineProps({
    title: {
        type: String,
        default: 'Agregar nuevo Cliente'
    },
    clientShowId: {
        type: Object,
        default: null
    }
});

const nombre = ref('');
const telefono = ref('');
const email = ref('');
const id = ref('');
const textButton = ref('Agregar');
const textSuccess = ref('El cliente se ha creado correctamente');
const dialog = ref(false);

const generalRules = [
    (value) => {
        if (value) return true
        return 'El campo es requerido'
    }]


watch(
    () => props.clientShowId,
    (newClient) => {
        if (newClient && newClient.id) {
            textButton.value = 'Actualizar'
            textSuccess.value = 'El cliente se ha actualizado correctamente'
            nombre.value = newClient.nombre
            telefono.value = newClient.telefono
            email.value = newClient.email
            id.value = newClient.id
        }
    },
    { immediate: true }
)
const crearCliente = async () => {

    const client = {
        id: id.value,
        nombre: nombre.value,
        email: email.value,
        telefono: telefono.value
    };

    if (props.clientShowId) {
        try {
            await store.updateClientData(client.id, client);
            store.getClientsData();
            dialog.value = true;
        } catch (error) {
            console.error('Error updating client:', error);
        }
        return
    }

    try {
        await store.createClientData(client);
        store.getClientsData();
        dialog.value = true;
    } catch (error) {
        console.error('Error creating client:', error);
    }

}

const aceptar = () => {
    dialog.value = false
    router.push({ name: 'usuarios' })
}


</script>

<template>
    <Header titulo="Inventario" />

    <div class="conten-form">
        <h1>{{ props.title }}</h1>
        <form @submit.prevent="crearCliente">

            <v-text-field class="input" v-model="id" :rules="generalRules" label="Cedula" required></v-text-field>
            <v-text-field class="input" v-model="nombre" :rules="generalRules" label="Nombre" required></v-text-field>
            <v-text-field class="input" v-model="email" :rules="generalRules" label="Email" required></v-text-field>
            <v-text-field class="input" v-model="telefono" :counter="10" :rules="telefonoRules" label="Telefono"
                required></v-text-field>

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