import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useClientsStore = defineStore('clients', () => {
    const clients = ref([
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
    const headers = ref([
        { title: 'id', value: 'id', sortable: false },
        { title: 'Nombre', value: 'nombre', sortable: false },
        { title: 'Email', value: 'email', sortable: false },
        { title: 'Telefono', value: 'telefono', sortable: false },
        { title: 'Direccion', value: 'direccion', sortable: false },
        { title: 'Fecha de Registro', value: 'fechaRegistro', sortable: true },
        { title: 'Acciones', value: 'acciones', sortable: false, align: 'end' }

    ])

    return {
        clients,
        headers
    }
})