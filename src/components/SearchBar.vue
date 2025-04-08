<script setup>
import { ref, watch } from 'vue';
const search = ref('');


const emit = defineEmits(['update:search'])

watch(search, (newVal) => {
    emit('update:search', newVal)
})
</script>

<template>
    <div> <v-text-field v-model="search" label="Buscar..." prepend-inner-icon="mdi-magnify" class="mb-4"
            variant="solo-filled" flat hide-details />
    </div>
</template>

<style scoped></style>