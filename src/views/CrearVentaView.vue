    <script setup>
    import { ref } from 'vue'
    import BuscarCliente from '../components/BuscarCliente.vue'
    import BuscarProducto from '../components/BuscarProducto.vue'
    import CrearVenta from '../components/CrearVenta.vue'

    const cliente = ref(null)
    const producto = ref(null)
    const cantidad = ref(0)
    const propiedad = ref(false)
    const credito = ref(null)

    function handleClienteBuscado(payload) {
        cliente.value = payload.cliente
        propiedad.value = true
        credito.value = payload.credito
    }

    function handleProductoBuscado(payload) {
        producto.value = payload.producto
        cantidad.value = payload.cantidad
    }



    function cancelarVenta() {
        producto.value = null
        cantidad.value = 0
        propiedad.value = false
    }

    function eliminarDelArreglo(idProducto) {
        if (producto.value && producto.value.id === idProducto) {
            producto.value = null
        }

    }
</script>

    <template>
        <h1>Crear Venta</h1>
        <div class="crear-venta">
            <BuscarCliente @cliente-buscado="handleClienteBuscado" />
            <BuscarProducto @producto-buscado="handleProductoBuscado" :propiedad="propiedad" />
        </div>

        <CrearVenta v-if="producto" :cliente="cliente" :producto="producto" :cantidad="cantidad"
            @cancelar-venta="cancelarVenta" @eliminar-del-producto="eliminarDelArreglo" :propiedad="propiedad"
            :credito="credito" @producto-agregado="limpiarProducto" />
    </template>


<style scoped lang="scss">
.crear-venta {
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background-color: $color-secondary;
    margin: 40px 40px;
    padding: 20px;

}

h1 {
    color: white;
    text-align: center;
}

.crear-venta>* {
    flex: 1 1 100%;
    /* o usa flex: 1 si quieres que todos crezcan por igual */
    min-width: 250px;
    /* opcional para evitar que se encojan demasiado */
    margin: 10px;

}
</style>