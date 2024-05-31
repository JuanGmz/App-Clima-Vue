import axios from 'axios';
import { ref, computed } from 'vue';

export default function useClima() {
    // State para guardar el clima
    const clima = ref({});

    // State para el spinner
    const cargando = ref(false);


    // State en caso de error
    const error = ref('');

    // Consultar la API
    const obtenerClima = async ({ ciudad, pais }) => {
        // Importar el API Key
        const key = import.meta.env.VITE_API_KEY;

        // Cambiamos el state de cargando a true
        cargando.value = true;

        clima.value = {};

        // Reinicio del state error para que se deje de mostrar
        error.value = '';

        try {
            // Obtener la latitud y longitud
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`;
            // Obtenemos los datos de la api con axios, uso de  destructuring para acceder a la informacion que interesa
            const { data } = await axios(url);
            // destructuring a data para acceder a latitud y longitud
            const { lat, lon } = data[0];
            // Obtener el clima
            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
            const { data: resultado } = await axios(urlClima);
            clima.value = resultado;

        } catch {
            error.value = 'Ciudad no Encontrada';
        } finally {
            // Cambio en el state de cargando a false para que deje de aparecer
            cargando.value = false;
        }
    };

    const mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0;
    });

    // Funcion para mostrar la temperatura en grados celcius
    const formatearTemperatura = temperatura => parseInt(temperatura - 273.15);

    return {
        obtenerClima,
        clima,
        mostrarClima,
        formatearTemperatura,
        cargando,
        error
    };
};