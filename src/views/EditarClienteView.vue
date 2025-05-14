<script setup>
import { ref } from 'vue';
import { useClientsStore } from '../store/ClientsStore';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import FormClient from '../components/FormClient.vue';


const store = useClientsStore()
const router = useRoute()

const client = ref({})
const id = router.params.id

onMounted(async () => {
    if (id) {
        try {
            const response = await store.getClientDataById(id)
            client.value = response;
            console.log('Cliente:', client.value)
        } catch (error) {
            console.error('Error al obtener cliente:', error)
        }
    }
})



</script>

<template>
    <FormClient title="Editar Cliente" :clientShowId="client" />
</template>

<style scoped></style>