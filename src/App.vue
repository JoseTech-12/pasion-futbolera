<script setup>
import { useUsersLogStore } from './store/UserLogStore.js'
import { storeToRefs } from 'pinia'
import MenuNav from './components/MenuNav.vue'
import LoginView from './views/LoginView.vue'
import { onMounted } from 'vue';


const store = useUsersLogStore()

onMounted(() => {
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    store.setUser({ token: storedToken })
  }
})


const { token } = storeToRefs(store) 
</script>

<template>

  <MenuNav v-if="token" />
  <LoginView v-else />
</template>


<style lang="scss">
p {
  color: white;
  font-size: 1.2rem;
  text-align: center;
}
</style>