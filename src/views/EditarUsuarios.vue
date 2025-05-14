<script setup>
import Header from '../components/Header.vue'
import FormUser from '../components/FormUser.vue';

import { useRoute } from 'vue-router';
import { useUserStore } from '../store/UserStore';
import { ref, onMounted } from 'vue';


const router = useRoute()
const id = router.params.id

const store = useUserStore()
const user = ref({})

onMounted(async () => {
    if (id) {
        try {
            const response = await store.userShow(id)
            user.value = response
            console.log(user.value)
        } catch (error) {
            console.error('Error al obtener usuario:', error)
        }
    }
})


</script>

<template>
    <Header />
    <FormUser title="Actualizar Usuario" :userShowId="user" />
</template>

<style scoped></style>