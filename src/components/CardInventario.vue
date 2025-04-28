<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    headers: {
        type: Array,
        required: true
    }
})
</script>
<template>
    <v-table class="card">
        <thead>
            <tr>
                <th v-for="header in headers">
                    {{ header.text }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td v-for="header in headers" :key="header.value">
                    <v-icon v-if="header.icon" class="mr-2" :class="header.iconColor || ''">
                        {{ header.icon }}
                    </v-icon>
                    {{ item[header.value] }}
                </td>
            </tr>
        </tbody>
    </v-table>

</template>

<style scoped lang="scss">
.card {
    background-color: $color-secondary;
    max-width: 500;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    padding: 10px 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 10px 20px #1e1e2f;
    transform: translateY(-5px);
}
</style>