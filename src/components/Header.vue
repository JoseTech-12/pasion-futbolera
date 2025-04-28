<script setup>
import { defineProps } from 'vue';
import { useUsersLogStore } from "../store/UserLogStore.js"
import { storeToRefs } from 'pinia';
import router from '../router/index.js';

const store = useUsersLogStore();
const { user } = storeToRefs(store)

defineProps({
    titulo: {
        type: String,
        default: 'Pasion Futbolera'
    }
});

const logout = async () => {

    await store.logout()
    router.push({ name: 'pasion-futbolera-login' })
    localStorage.removeItem('token');



}

</script>

<template>
    <header>
        <h1>{{ titulo }}</h1>
        <div class="contenerdo-btns"><button>
                <v-icon>mdi-account</v-icon>
                <span>{{ user.rol }}</span>
            </button>
            <button @click="logout">
                <v-icon>mdi-logout</v-icon>
            </button>
        </div>

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

.contenerdo-btns {
    display: flex;

    gap: 20px;
}

button:hover {
    background-color: #1e1e2f;

}
</style>