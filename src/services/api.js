import axios from 'axios';

export async function obtenerElementos() {
  try {
    const response = await axios.get('/data.json'); // ruta del json o api
    return response.data; // axios convierte a JSON automáticamente
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

  