<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useSaleStore } from '../store/SaleStore'
import { useProductStore } from '../store/ProductStore'
const storeProduct = useProductStore()
const store = useSaleStore()

const props = defineProps({
    cliente: { type: Object, required: true },
    producto: { type: Object, required: true },
    cantidad: { type: Number, required: true },
    propiedad: { type: Boolean, required: true },
    credito: { type: Object }
})
const mostrarDialogo = ref(false)
const emit = defineEmits(['cancelar-venta', 'eliminar-del-producto'])

const carrito = ref([])
const habilitarWatcher = ref(true)
const loading = ref(false)


watch(
    () => [props.producto?.id, props.cantidad],
    ([nuevoId, nuevaCantidad], oldValue) => {
        if (!habilitarWatcher.value) return
        if (!nuevoId || nuevaCantidad <= 0) return

        const [prevId, prevCantidad] = oldValue || []

        if (nuevoId === prevId && nuevaCantidad === prevCantidad) return

        const productoExistente = carrito.value.find(p => p.producto.id === nuevoId)
        if (productoExistente) {
            productoExistente.cantidad += nuevaCantidad
        } else {
            carrito.value.push({ producto: props.producto, cantidad: nuevaCantidad })
            emit('producto-agregado')

        }
    },
    { immediate: true }
)

function limpiarProducto() {
    producto.value = null
    cantidad.value = 0
}


const eliminarProducto = (index, productoId) => {
    carrito.value.splice(index, 1)

}

const cancelar = () => {
    habilitarWatcher.value = false
    carrito.value = []
    emit('cancelar-venta')
    setTimeout(() => {
        habilitarWatcher.value = true
    }, 0)
}



const confirmarVenta = () => {
    if (carrito.value.length === 0) {
        alert('No hay productos en el carrito')
        return
    }

    const total = carrito.value.reduce(
        (sum, item) => sum + item.producto.precio * item.cantidad, 0
    )

    if (props.credito && props.credito.estado === 'activo') {
        const montoCredito = parseFloat(props.credito.monto)

        if (montoCredito < total) {
            alert(`El monto del crédito ($${montoCredito}) no es suficiente para cubrir el total de la compra ($${total})`)
            return
        }
    }

    mostrarDialogo.value = true

}


const finalizarVenta = async () => {
    loading.value = true
    const ventaData = {
        client_id: props.cliente.id,
        products: carrito.value.map(item => ({
            product_id: item.producto.id,
            cantidad: item.cantidad
        }))
    }
    try {
        const response = await store.createSaleAll(ventaData)
        alert('Venta confirmada')
        carrito.value = []
        mostrarDialogo.value = false
        storeProduct.fetchProducts()
        store.getSalesall()

        cancelar()
    } catch (error) {
        console.error('Error al confirmar la venta:', error)
        alert('Error al confirmar la venta')

    }
}
</script>

<template>
    <div>
        <h4>Carrito de compras</h4>
        <table>
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Nombre</th>
                    <th>Precio Unitario</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in carrito" :key="index">
                    <td>{{ item.cantidad }}</td>
                    <td>{{ item.producto.nombre }}</td>
                    <td>{{ item.producto.precio }}</td>
                    <td>
                        <button @click="eliminarProducto(index, item.producto.id)" class="btn-eliminar">
                            <v-icon>mdi-delete</v-icon>Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="total">
        <h4>Cliente: {{ cliente.nombre }}</h4>
        <h4>Total: {{carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0)}}</h4>
        <v-btn color="green" @click="confirmarVenta">Confirmar Venta</v-btn>
        <v-btn @click="cancelar" color="red">Cancelar Venta</v-btn>
    </div>


    <v-dialog v-model="mostrarDialogo" max-width="500px">
        <v-card>
            <v-card-title class="text-h6">¿Confirmar Venta?</v-card-title>
            <v-card-text>
                <p><strong>Cliente:</strong> {{ cliente.nombre }}</p>
                <ul>
                    <li v-for="(item, index) in carrito" :key="index">
                        {{ item.cantidad }} x {{ item.producto.nombre }} - ${{ item.producto.precio }}
                    </li>
                </ul>
                <p><strong>Total:</strong> ${{carrito.reduce((total, item) => total + item.producto.precio *
                    item.cantidad, 0)}}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="red" text @click="mostrarDialogo = false">Cancelar</v-btn>
                <v-btn :loading="loading" :disabled="loading" color="green" text
                    @click="finalizarVenta">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>



<style scoped lang="scss">
div {
    h4 {
        color: white;
        text-align: center;
    }

    color: white;
    background-color: $color-secondary;
    padding: 30px;
}

table {
    width: 100%;
    margin-top: 10px;
    border: 1px solid white;

}

th,
td {
    padding: 8px 12px;
    text-align: left;

}

th {
    background-color: rgba(255, 255, 255, 0.2);
}

.total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}
</style>
