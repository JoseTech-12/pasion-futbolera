<script setup>
import { ref } from 'vue'
import { useClientsStore } from '../store/ClientsStore.js'
import { useCreditStore } from '../store/CreditStore.js'
import { defineEmits } from 'vue'

const creditStore = useCreditStore()

const emit = defineEmits(['cliente-buscado'])

const store = useClientsStore()
const celula = ref('')


const message = ref('')
const showAlert = ref(false)
const buscarCliente = async () => {
    const cliente = store.clients.find(cliente => cliente.id === celula.value)
    if (cliente) {
        try {
            const creditos = await creditStore.getCreditByIds(cliente.id)
            const credito = creditos[0]  // ✅ Tomamos el primer crédito si existe

            if (credito && credito.estado === 'activo') {
                message.value = `Cliente: ${cliente.nombre}, ya tiene un crédito activo de ${credito.monto}`
                emit('cliente-buscado', { cliente, credito })
            } else {
                message.value = `Cliente encontrado: ${cliente.nombre}, sin créditos activos.`
                emit('cliente-buscado', { cliente, credito: null })
            }
        } catch (error) {
            message.value = `Cliente encontrado: ${cliente.nombre}, sin créditos.`
            emit('cliente-buscado', { cliente, credito: null })
        }

        showAlert.value = true
        celula.value = ''
    } else {
        message.value = 'Cliente no encontrado'
        showAlert.value = true
        emit('cliente-buscado', null)
    }
}


</script>

<template>
    <div class="container-buscar">
        <v-alert v-model="showAlert" type="info" closable>
            {{ message }}
        </v-alert>

        <div class="conten-bnt">
            <v-text-field class="campo-input" v-model="celula" type="number" :rules="nombreRules"
                label="Cedula del cliente" required></v-text-field>
            <v-btn class="btn" @click="buscarCliente"><v-icon>mdi-magnify</v-icon><span>buscar</span></v-btn>
            <router-link class="btn" :to="{ name: 'agregar-cliente' }">
                <v-btn class="bg-transparent elevation-0 text-primary btn"><v-icon>mdi-account-plus</v-icon><span>Agregar
                        Cliente</span></v-btn>
            </router-link>
        </div>


    </div>
</template>

<style scoped>
.container-buscar {
    color: white;
}

.conten-bnt {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 10px;
    margin-bottom: 20px;
    max-width: 400px;
}

.btn {
    width: 100%;
}
</style>