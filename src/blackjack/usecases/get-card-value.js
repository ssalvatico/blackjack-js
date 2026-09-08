/**
 * Extrae el valor de una carta representada con un string
 * @param {string} carta Ejemplo: '2A'
 * @param {number} turno Ejemplo: 0
 * @param {number[]} puntosJugadores Arreglo con los puntos de cada jugador
 * @returns {number}
 */
const valorCarta = (carta, turno, puntosJugadores) => {
    const valor = carta.substring(0, carta.length - 1);
    return !isNaN(valor) ? (valor * 1) : (valor !== 'A') ? 10 : (puntosJugadores[turno] <= 10) ? 11 : 1;
}

export default valorCarta;