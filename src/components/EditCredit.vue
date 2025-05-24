<script setup>
import Header from '@/components/Header.vue'
import { ref, defineProps } from 'vue'
import { useCreditStore } from '../store/CreditStore'
import { watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();

const opciones = [200000, 250000, 300000]
const cliente_id = ref('')
const seleccion = ref(null)
const dialog = ref(false)
const textButton = ref('Agregar Credito')
const textSuccess = ref('')
const rolRules = [
    (value) => {
        if (value) return true
        return 'Monto es requerido'
    },
    (value) => {
        if (opciones.includes(value)) return true
        return 'Monto no es valido'
    }
]

const props = defineProps({
    title: {
        type: String,
        default: 'Crear nuevo credito'
    },
    creditShowId: {
        type: Object,
        default: null
    }
})

watch(
    () => props.creditShowId,
    (nuevoCredito) => {
        if (nuevoCredito && nuevoCredito.cliente_id && nuevoCredito.monto) {
            cliente_id.value = nuevoCredito.cliente_id
            seleccion.value = nuevoCredito.monto
            textButton.value = 'Actualizar Crédito'
        }
    },
    { immediate: true }
)

const nombreRules = [
    (value) => {
        if (value) return true
        return 'Cedula es requerido'
    },
    (value) => {
        if (/^\d+$/.test(value)) return true
        return 'Cedula no es valido'
    }
]


const crearCredito = async () => {
    const store = useCreditStore()
    const credit = {
        cliente_id: cliente_id.value,
        monto: seleccion.value
    }

    if (props.creditShowId) {
        try {
            await store.updateCredit(credito)
            store.getCredits()
            dialog.value = true
        } catch (error) {
            console.error('Error updating credit:', error)
        }
    } else {
        try {
            const response = await store.createCredits(credit);
            store.fetchCredits();
            textSuccess.value = 'Crédito creado correctamente';
            dialog.value = true;
        } catch (error) {
            console.error('Error creating credit:', error);
            if (error.response) {
                textSuccess.value = error.response.data.message || 'Error desconocido al crear el crédito.';
            } else {
                textSuccess.value = error.message || 'Error de red o conexión con el servidor.';
            }
            dialog.value = true;
        }


    }
}
const aceptar = () => {
    dialog.value = false
    router.push({ name: 'creditos' })
}

</script>

<template>
    <Header />

    <div class="conten-form">
        <h1>{{ props.title }}</h1>
        <form @submit.prevent="crearCredito">

            <v-text-field class="input" v-model="cliente_id" :rules="nombreRules" label="cedula cliente"
                required></v-text-field type="number">

            <v-select class="input" v-model="seleccion" :rules="rolRules" :items="opciones" label="Monto"
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