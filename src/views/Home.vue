<template>
  <div>
    <h1>Página de Inicio</h1>
    
    <h2>Agregar Elementos</h2>
    <div>
      <input type="text" v-model="nuevoElemento.nombre" placeholder="Nombre" />
      <input type="number" v-model.number="nuevoElemento.peso" placeholder="Peso" />
      <input type="number" v-model.number="nuevoElemento.calorias" placeholder="Calorías" />
      <button @click="agregarElemento">Agregar</button>
    </div>
    
    <h2>Lista de Elementos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Peso</th>
          <th>Calorías</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(el, index) in elementos" :key="index">
          <td>{{ el.nombre }}</td>
          <td>{{ el.peso }}</td>
          <td>{{ el.calorias }}</td>
        </tr>
      </tbody>
    </table>
    
    <h2>Parámetros de Cálculo</h2>
    <div>
      <label>Peso Máximo:</label>
      <input type="number" v-model.number="pesoMaximo" />
      <label>Calorías Mínimas:</label>
      <input type="number" v-model.number="caloriasMinimas" />
    </div>
    
    <button @click="calcularMejorCombinacion">Calcular</button>
    <button @click="calcularDatosDB">Calcular datos de la DB</button>
    
    <h2>Mejor Combinación (Guardada en Objeto)</h2>
    <pre>{{ mejorCombinacion }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { obtenerElementos } from '@/services/api'; // Importar la función correctamente

export default {
  setup() {
    const router = useRouter();
    const elementos = ref([]);
    const nuevoElemento = ref({ nombre: '', peso: null, calorias: null });
    const pesoMaximo = ref(10);
    const caloriasMinimas = ref(15);
    const mejorCombinacion = ref('');

    const agregarElemento = () => {
      if (nuevoElementoValido()) {
        elementos.value.push({ ...nuevoElemento.value });
        nuevoElemento.value = { nombre: '', peso: null, calorias: null };
      }
    };

    const nuevoElementoValido = () => {
      return (
        nuevoElemento.value.nombre &&
        nuevoElemento.value.peso > 0 &&
        nuevoElemento.value.calorias > 0
      );
    };

    const calcularMejorCombinacion = () => {
      mejorCombinacion.value = obtenerMejorCombinacion(elementos.value);
    };

    const calcularDatosDB = async () => {
      try {
        const data = await obtenerElementos(); // Usar la función desde api.js
        elementos.value = data; // Guardar los datos obtenidos en el array
        mejorCombinacion.value = obtenerMejorCombinacion(elementos.value);
      } catch (error) {
        console.error('Error obteniendo datos de la DB:', error);
      }
    };

    const obtenerMejorCombinacion = (data) => {
      let resultado = [];
      let mejorCalorias = 0;

      const backtrack = (indice, combinacion, pesoActual, caloriasActual) => {
        if (pesoActual > pesoMaximo.value) return;
        if (caloriasActual >= caloriasMinimas.value) {
          if (caloriasActual > mejorCalorias) {
            mejorCalorias = caloriasActual;
            resultado = [...combinacion];
          }
        }
        for (let i = indice; i < data.length; i++) {
          combinacion.push(data[i]);
          backtrack(
            i + 1,
            combinacion,
            pesoActual + data[i].peso,
            caloriasActual + data[i].calorias
          );
          combinacion.pop();
        }
      };

      backtrack(0, [], 0, 0);
      return resultado.map(el => el.nombre).join(', ');
    };

    return {
      router,
      elementos,
      nuevoElemento,
      pesoMaximo,
      caloriasMinimas,
      mejorCombinacion,
      agregarElemento,
      calcularMejorCombinacion,
      calcularDatosDB,
    };
  }
};
</script>



<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
button {
  margin-top: 10px;
  cursor: pointer;
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
