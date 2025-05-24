<script setup>
import { ref } from 'vue'
import { useProductStore } from '../store/ProductStore'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    propiedad: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['producto-buscado'])

const store = useProductStore()
const idProducto = ref(0)
const cantidad = ref(0)


const message = ref('')
const showAlert = ref(false)

const buscarProducto = () => {
    const producto = store.products.find(producto => producto.id == idProducto.value)
    if (producto) {
        if (cantidad.value <= 0) {
            message.value = 'La cantidad debe ser mayor a 0'
            showAlert.value = true
            return
        } else if (cantidad.value > producto.stock) {
            message.value = 'No hay suficiente stock'
            showAlert.value = true
            return
        }
        message.value = 'Producto Agregado'
        showAlert.value = true

        emit('producto-buscado', { producto: producto, cantidad: cantidad.value })
    } else {
        message.value = 'Producto no encontrado'
        showAlert.value = true
        emit('producto-buscado', null)
    }
}
</script>

<template>
    <div class="container-buscar">
        <v-alert v-model="showAlert" type="info" closable>
            {{ message }}
        </v-alert>
        <div class="conten-bnt">
            <v-text-field class="campo-input" v-model="idProducto" type="number" :rules="nombreRules"
                label="Id del producto" required></v-text-field>
            <v-text-field class="campo-input" v-model="cantidad" type="number" :rules="nombreRules" label="Cantidad"
                required></v-text-field>
            <v-btn :disabled="!propiedad" class="btn" @click="buscarProducto"><v-icon>mdi-cart</v-icon><span>Agregar
                    Producto</span></v-btn>
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