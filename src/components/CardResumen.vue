<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    titulo: {
        type: String
    },
    valor: {
        type: String
    },
    descripcion: {
        type: String
    }

})

</script>

<template>
    <div class="contenido">
        <h3>{{ titulo }}</h3>
        <h1>{{ valor }}</h1>
        <h3>{{ descripcion }}</h3>
    </div>
</template>

<style scoped lang="scss">
.contenido {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    color: white;
    align-items: first baseline;
    background-color: $color-secondary;
    border: 1px solid white;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    h1 {
        color: #2ecc71;
    }
}


.contenido:hover {
    box-shadow: 0 10px 20px #1e1e2f;
    transform: translateY(-5px);

}
</style>