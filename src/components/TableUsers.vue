<script setup>
import SearchBar from './SearchBar.vue';
import { ref, computed } from 'vue';
const searchQuery = ref('');
const headers = [
    { title: 'id', value: 'id', sortable: false },
    { title: 'Nombre', value: 'nombre', sortable: false },
    { title: 'Email', value: 'email', sortable: false },
    { title: 'Telefono', value: 'telefono', sortable: false },
    { title: 'Direccion', value: 'direccion', sortable: false },
    { title: 'Fecha de Registro', value: 'fechaRegistro', sortable: true },
    { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }

]
const items = ref([
    {
        id: 3245454,
        nombre: 'Juan Perez',
        email: 'juan@gmail.com',
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        fechaRegistro: '2023-10-01',
    },
    {
        id: 3245455,
        nombre: 'Maria Lopez',
        email: 'maria@gmail.com',
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 456',
        fechaRegistro: '2023-10-02',
    },
    {
        id: 3245456,
        nombre: 'Carlos Gomez',
        email: 'carlos@gmail.com',
        telefono: '456123789',
        direccion: 'Calle Luna 789',
        fechaRegistro: '2023-10-03',
    },
    {
        id: 3245457,
        nombre: 'Ana Torres',
        email: 'ana@gmail.com',
        telefono: '321654987',
        direccion: 'Calle Sol 321',
        fechaRegistro: '2023-10-04',
    },
    {
        id: 3245458,
        nombre: 'Luis Martinez',
        email: 'luis@gmail.com',
        telefono: '654987321',
        direccion: 'Avenida Estrella 654',
        fechaRegistro: '2023-10-05',
    },
    {
        id: 3245459,
        nombre: 'Sofia Ramirez',
        email: 'sofia@gmail.com',
        telefono: '789321654',
        direccion: 'Calle Nube 987',
        fechaRegistro: '2023-10-06',
    },
    {
        id: 3245460,
        nombre: 'Diego Fernandez',
        email: 'diego@gmail.com',
        telefono: '123789456',
        direccion: 'Calle Rio 123',
        fechaRegistro: '2023-10-07',
    },
    {
        id: 3245461,
        nombre: 'Laura Sanchez',
        email: 'laura@gmail.com',
        telefono: '987123654',
        direccion: 'Avenida Mar 456',
        fechaRegistro: '2023-10-08',
    },
    {
        id: 3245462,
        nombre: 'Jorge Herrera',
        email: 'jorge@gmail.com',
        telefono: '456987123',
        direccion: 'Calle Bosque 789',
        fechaRegistro: '2023-10-09',
    },
    {
        id: 3245463,
        nombre: 'Valeria Ortiz',
        email: 'valeria@gmail.com',
        telefono: '321987654',
        direccion: 'Calle Lago 321',
        fechaRegistro: '2023-10-10',
    },
    {
        id: 3245464,
        nombre: 'Ricardo Castro',
        email: 'ricardo@gmail.com',
        telefono: '654321987',
        direccion: 'Avenida Cielo 654',
        fechaRegistro: '2023-10-11',
    },

])
const filteredItems = computed(() =>
    items.value.filter((item) =>
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



        <v-data-table :headers="headers" :items="filteredItems" :items-per-page-text="'Registros por página'"
            :items-per-page-options="[10, 20, 40, { title: 'all', value: -1 }]">
            <template #item.acciones="{ item }">
                <div class="d-flex align-center ga-1">
                    <v-btn icon color="blue" @click="editarItem(item)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="eliminarItem(item)">
                        <v-icon>mdi-delete</v-icon>
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