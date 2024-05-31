<script setup>
import useClima from '../composables/useClima';

const { formatearTemperatura } = useClima();

// Definicion de propiedades del objeto clima para poder usarlo en App.vue
defineProps({
    clima: {
        type: Object,
        required: true
    },
});
</script>

<template>
    <div class="resultado">
        <h2>Clima de: {{ clima.name }} </h2>

        <p class="actual">{{ formatearTemperatura(clima.main.temp) }}<span>&deg;C</span></p>
        <div class="temperaturas">
            <p>Min: {{ formatearTemperatura(clima.main.temp_min) }}<span>&deg;C</span></p>
            <p>Max: {{formatearTemperatura(clima.main.temp_max) }}<span>&deg;C</span></p>
        </div>
    </div>
</template>