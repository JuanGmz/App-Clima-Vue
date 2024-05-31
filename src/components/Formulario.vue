<script setup>
import { reactive, ref } from 'vue';
import Alerta from './Alerta.vue';

// State de error vacío
const error = ref('');

// Definicion de emits para hacer uso de en App.vue
const emit = defineEmits(['obtener-clima']);

// Arreglo para guardar paises
const paises = [
    { codigo: 'US', nombre: 'Estados Unidos' },
    { codigo: 'MX', nombre: 'México' },
    { codigo: 'AR', nombre: 'Argentina' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'CR', nombre: 'Costa Rica' },
    { codigo: 'ES', nombre: 'España' },
    { codigo: 'PE', nombre: 'Perú' }
];

// State para guardar los valores del formulario
const busqueda = reactive({
    ciudad: '',
    pais: ''
});

// Función para consultar el clima
const consultarClima = () => {
    if(Object.values(busqueda).includes('')){
        error.value = 'Todos los campos son obligatorios';
        return
    }
    // Reinicio del state error
    error.value = '';
    emit('obtener-clima', busqueda);
};
</script>

<template>
    <form  
        class="formulario"
        @submit.prevent="consultarClima"
    >
        <!-- Renderizamos el componente de la alerta s-->
        <Alerta v-if="error"> {{ error }}</Alerta>
        <!-- Aquí van los label e inputs -->
        <div class="campo">
            <label>Ciudad</label>
            <!-- Los v-model siempre van en los inputs-->
            <input 
                type="text" 
                id="ciudad" 
                placeholder="Ciudad"
                v-model="busqueda.ciudad"
            >
        </div>
        <div class="campo">
            <label for="pais">País</label>
            <!-- Los v-model siempre van en los inputs-->
            <select 
                id="pais"
                v-model="busqueda.pais"
            >
                <option value="">-- Seleccione un País --</option>
                <option 
                    v-for="pais in paises" 
                    :value="pais.codigo"
                > {{ pais.nombre }}</option>
            </select>
        </div>
        <!-- Botón para realizar la busqueda-->
        <input type="submit" value="Consultar Clima">
    </form>
</template>