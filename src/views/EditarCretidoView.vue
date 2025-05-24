<script setup>
import Header from '@/components/Header.vue'
import { useCreditStore } from '../store/CreditStore'
import EditCredit from '@/components/EditCredit.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useCreditStore()
const router = useRoute()
const id = router.params.id

const creditShowId = ref(null)

onMounted(async () => {
    try {
        const response = await store.getCreditByIds(id)
        if (Array.isArray(response) && response.length > 0) {
            creditShowId.value = response[0]
        } else {
            console.warn('Respuesta incompleta al obtener crédito:', response)
        }
    } catch (error) {
        console.error('Error al obtener crédito:', error)
    }
})


</script>

<template>
    <EditCredit :creditShowId="creditShowId" />
</template>

<style scoped></style>