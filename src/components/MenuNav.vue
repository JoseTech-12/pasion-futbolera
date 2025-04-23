<script setup>
import { ref, watchEffect } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(true)
const { mobile } = useDisplay()

watchEffect(() => {
  drawer.value = !mobile.value
})


const cerrarDrawer = () => {
  if (mobile.value) {
    drawer.value = false
  }
}
</script>

<template>
  <v-app class="menu-nav">

    <v-navigation-drawer v-model="drawer" :permanent="!mobile" :temporary="mobile" :scrim="mobile"
      class="custom-drawer">
      <v-list-item class="titulo" title="Dashboard" />
      <v-divider />
      <v-list-item class="items" :to="{ name: 'pasion-futbolera' }" link @click="cerrarDrawer">
        <template #prepend>
          <v-icon>mdi-home</v-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </template>
      </v-list-item>

      <v-list-item class="items" :to="{ name: 'productos' }" link @click="cerrarDrawer">
        <template #prepend>
          <v-icon>mdi-tshirt-crew</v-icon>
          <v-list-item-title>Inventario</v-list-item-title>
        </template>
      </v-list-item>


      <v-list-item class="items" :to="{ name: 'usuarios' }" link @click="cerrarDrawer">
        <template class="conten-items" #prepend>
          <v-icon>mdi-account</v-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </template>

      </v-list-item>

      <v-list-item class="items" :to="{ name: 'ventas' }" link @click="cerrarDrawer">
        <template class="conten-items" #prepend>
          <v-icon>mdi-cart</v-icon>
          <v-list-item-title>Ventas</v-list-item-title>
        </template>

      </v-list-item>



    </v-navigation-drawer>

    <v-main class="main">
      <router-view />
    </v-main>

    <v-btn v-if="mobile" class="floating-button" @click="drawer = true">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app>
</template>

<style scoped lang="scss">
.menu-nav {
  background-color: white;
  height: 100vh;
}

.titulo {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}

.items {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}

.floating-button {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 1000;
  background-color: $color-secondary;
  color: white;
}

.custom-drawer {
  background-color: $color-secondary;
  color: white;
}


.conten-items {
  display: flex;
  justify-content: space-around;
}

.main {
  background-color: $color-primary;
}
</style>
