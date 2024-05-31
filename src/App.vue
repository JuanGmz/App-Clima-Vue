<script setup>
import useClima from './composables/useClima.js';
import Formulario from './components/Formulario.vue';
import Clima from './components/Clima.vue';
import Spinner from './components/Spinner.vue';
import Alerta from './components/Alerta.vue';

// Hacemos uso del composable
const { obtenerClima, clima, mostrarClima, cargando, error } = useClima();

</script>

<template>
  <h1 class="titulo">Buscador de clima</h1>

  <!-- Contenedor para el Formulario -->
  <div class="contenedor buscador-clima">
    <!-- Renderizamos el Formulario -->
    <Formulario 
      @obtenerClima="obtenerClima"
    />
    <!-- Renderizamos el Clima -->
    <Spinner v-if="cargando"/>
    <!-- Alerta en caso de error -->
    <Alerta v-if="error">{{ error }}</Alerta>
    <!-- Renderizamos el clima -->
    <Clima
      v-if="mostrarClima"
      :clima="clima"
    />
  </div>

</template>