<script setup>
import SearchBar from './SearchBar.vue';
import { ref, computed, defineProps } from 'vue';

const props = defineProps({
    items: Array,
    headers: Array,
    eliminarItem: Function,
    editarItem: Function,
    pagarItem: Function,

})

const searchQuery = ref('');

const filteredItems = computed(() =>
    props.items.filter((item) =>
        Object.values(item).some((val) =>
            String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    )
)
</script>

<template>
    <div>
        <div>
            <SearchBar @update:search="searchQuery = $event" />
        </div>
        <v-data-table :headers="props.headers" :items="filteredItems" :items-per-page-text="'Registros por página'"
            :items-per-page-options="[10, 20, 40, { title: 'all', value: -1 }]">

            <template #item.acciones="{ item }">
                <div class="d-flex align-center ga-1">
                    <v-btn icon color="blue" @click="props.editarItem(item)" :disabled="item.estado === 'pagado'">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="props.eliminarItem(item)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn v-if="props.pagarItem" icon color="green" :disabled="item.estado === 'pagado'"
                        @click="props.pagarItem(item)">
                        <v-icon>mdi-cash</v-icon>
                    </v-btn>

                </div>
            </template>

        </v-data-table>
    </div>
</template>


<style scoped lang="scss">
.v-data-table {
    color: white;
    background-color: $color-secondary;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
</style>