<script setup>

</script>

<template>
    <div class="conteiner">
        <h2>Gestionar venta</h2>
        <div class="conten-bnt">
            <router-link :to="{ name: 'crear-venta' }">
                <v-btn class="btn-agregar">
                    <v-icon>mdi-plus</v-icon>
                    <span>Nueva Venta</span>
                </v-btn>
            </router-link>
            <router-link :to="{ name: 'ventas' }">
                <v-btn class="btn-historial">
                    <v-icon>mdi-book</v-icon>
                    <span>Ver Historial</span>
                </v-btn>
            </router-link>

        </div>
    </div>

</template>

<style scoped lang="scss">
.conteiner {
    background-color: $color-secondary;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 1000px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

h2 {
    color: white;
}

.conten-bnt {
    display: flex;
    gap: 15px
}


.conteiner:hover {
    box-shadow: 0 10px 20px #1e1e2f;
}
</style>