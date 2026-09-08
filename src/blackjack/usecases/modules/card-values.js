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

/**
 * Actualiza los puntos del jugador correspondiente a turno + 1
 * @param {string} carta Ejemplo: '2A'
 * @param {number} turno Ejemplo: 0
 * @param {number[]} puntosJugadores Arreglo con los puntos de cada jugador 
 * @param {NodeListOf<HTMLElement>} puntosHTML
 * @returns {number} Puntaje actualizado del jugador correspondiente
 */
export const actualizarPuntos = (carta, turno, puntosJugadores, puntosHTML) => {
    let puntos = valorCarta(carta, turno, puntosJugadores);
    puntosJugadores[turno] += puntos;
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
};