import { defineStore } from 'pinia';
import { getCredits, createCredit, payCredit, getCreditById, deleteCreditById } from '../services/creditService';
import { ref } from 'vue';
import { useClientsStore } from './clientsStore';

export const useCreditStore = defineStore('credit', () => {
    const credits = ref([]);
    const error = ref(null);
    const clientStore = useClientsStore();

    const headers = ref([
        { title: 'Cliente', key: 'cliente_id' },
        { title: 'Nombre', key: 'nombre', sortable: false },
        { title: 'email', key: 'email', sortable: false },
        { title: 'Monto', key: 'monto', sortable: false },
        { title: 'Estado', key: 'estado', sortable: false },
        { title: 'Acciones', key: 'acciones', sortable: false, align: 'end' },
    ]);

    const fetchCredits = async () => {
        error.value = null;
        try {
            const rawCredits = await getCredits();

            const enrichedCredits = await Promise.all(
                rawCredits.map(async (credit) => {
                    const client = await clientStore.getClientDataById(credit.cliente_id);
                    return {
                        ...credit,
                        nombre: client?.nombre || 'Desconocido',
                        email: client?.email || 'No disponible',
                    };
                })
            );

            credits.value = enrichedCredits;
        } catch (err) {
            error.value = err.message || 'Error al obtener créditos';
        }
    };

    const createCredits = async (credit) => {

        return await createCredit(credit)
    }


    const payCredits = async (creditId) => {
        error.value = null;
        try {
            const response = await payCredit(creditId);
            credits.value = credits.value.map((credit) =>
                credit.id === creditId ? { ...credit, estado: response.credito.estado } : credit
            );
            return response;
        } catch (err) {
            error.value = err.message || 'Error al pagar crédito';
        }
    };
    const getCreditByIds = async (client_id) => {
        error.value = null;
        try {
            const response = await getCreditById(client_id);
            return response;
        } catch (err) {
            error.value = err.message || 'Error al obtener crédito';
        }
    };

    const deleteCredit = async (creditId) => {
        error.value = null;
        try {
            const response = await deleteCreditById(creditId);
            credits.value = credits.value.filter((credit) => credit.id !== creditId);
            return response;

        } catch (err) {
            error.value = err.message || 'Error al eliminar crédito';
        }
    }



    fetchCredits()
    return {
        credits,
        error,
        headers,
        fetchCredits,
        createCredits,
        payCredits,
        getCreditByIds,
        deleteCredit,
    };
});
