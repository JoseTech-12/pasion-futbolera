<script setup>
import Header from '../components/Header.vue';
import { ref, defineProps } from 'vue'
import { createProduct } from '../services/productService.js'
import { useRouter } from 'vue-router'
import { useProductStore } from '../store/ProductStore.js';
import { watch } from 'vue';

const store = useProductStore()
const router = useRouter()


const props = defineProps({
    title: {
        type: String,
        default: 'Agregar nuevo Producto'
    },
    productShowId: {
        type: Object,
        default: null
    }
})

const nombre = ref('')
const descripcion = ref('')
const precio = ref()
const stock = ref()
const seleccion = ref(null)
const categoria = ref('')
const dialog = ref(false)
const textButton = ref('Agregar Usuario')
const textSuccess = ref('El usuario se ha creado correctamente')
const opciones = ['S', 'M', 'L', 'XL', 'XXL']
const opcionesCategoria = ['Club', 'Seleccion', 'Retro', 'Edicion Especial']
const seleccionCategoria = ref(null)
const año = ref()

const generalRules = [
    (value) => {
        if (value) return true
        return 'El campo es requerido'
    }]

const aceptar = () => {
    dialog.value = false
    router.push({ name: 'productos' })
}

if (props.productShowId) {
    textButton.value = 'Actualizar Producto'
    textSuccess.value = 'El producto se ha actualizado correctamente'
}

watch(() => props.productShowId, (newVal) => {
    if (newVal) {
        nombre.value = newVal.nombre || ''
        descripcion.value = newVal.descripcion || ''
        precio.value = newVal.precio || ''
        stock.value = newVal.stock || ''
        seleccion.value = newVal.talla || null
        seleccionCategoria.value = newVal.categoria || null
        año.value = newVal.año || ''
    }
}, { immediate: true })
const crearProducto = async () => {
    const data = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        talla: seleccion.value,
        stock: stock.value,
        precio: precio.value,
        categoria: seleccionCategoria.value,
        año: año.value

    }

    if (props.productShowId) {
        data.id = props.productShowId.id
        const id = props.productShowId.id
        try {
            await store.updateProductDetails(id, data)
            dialog.value = true
            store.fetchProducts()
        } catch (error) {
            console.error('Error al actualizar el producto:', error)
        }
        return
    }

    if (!props.productShowId) {
        try {
            await createProduct(data)
            dialog.value = true
            store.fetchProducts()
        } catch (error) {
            console.error('Error al crear el producto:', error)
        }
    }

}
</script>

<template>
    <Header titulo="Inventario" />

    <div class="conten-form">
        <h1>{{ props.title }}</h1>
        <form @submit.prevent="crearProducto">

            <v-text-field class="input" v-model="nombre" :rules="generalRules" label="Nombre" required></v-text-field>
            <v-text-field class="input" v-model="descripcion" :rules="generalRules" label="Descripcion"
                required></v-text-field>

            <v-text-field class="input" v-model="stock" :rules="generalRules" label="Stock" type="number"
                required></v-text-field>
            <v-text-field class="input" v-model="precio" :rules="generalRules" label="Precio" type="number"
                required></v-text-field>
            <v-text-field class="input" v-model="año" :rules="generalRules" label="Año" type="number"
                required></v-text-field>


            <v-select class="input" v-model="seleccion" :rules="generalRules" :items="opciones" label="Talla"
                outlined></v-select>

            <v-select class="input" v-model="seleccionCategoria" :rules="generalRules" :items="opcionesCategoria"
                label="Categoria" outlined></v-select>

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