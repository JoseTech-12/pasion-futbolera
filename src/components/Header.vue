<script setup>
import { defineProps } from 'vue';

defineProps({
    titulo: {
        type: String,
        default: 'Pasion Futbolera'
    }
});

</script>

<template>
    <header>
        <h1>{{ titulo }}</h1>
        <button>
            <v-icon>mdi-account</v-icon>
            <span>Login</span>
        </button>
    </header>
</template>

<style scoped lang="scss">
header {

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;
    padding: 20px;
}

button {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
}

button:hover {
    background-color: #1e1e2f;

}
</style>