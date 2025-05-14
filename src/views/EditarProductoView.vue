<script setup>

import FormProduct from '../components/FormProduct.vue';
import { useProductStore } from '../store/ProductStore';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRoute()
const id = router.params.id



const store = useProductStore()

const product = ref({})
onMounted(async () => {
    if (id) {
        try {
            const response = await store.getProduct(id)
            product.value = response

        } catch (error) {
            console.error('Error al obtener producto:', error)
        }
    }
})

</script>

<template>
    <FormProduct title="Editar producto" :productShowId="product" />
</template>

<style scoped></style>