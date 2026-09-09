import { agregarCartaDOM } from './update-card-DOM';
import { anunciarGanador } from './announce-winner';
import { actualizarPuntos } from './card-values';
import { pedirCarta } from './take-card';

/**
 * Simula la lógica del turno de la computadora
 * @param {string[]} mazo 
 * @param {number[]} puntosJugadores 
 * @param {NodeListOf<HTMLElement>} puntosHTML 
 * @param {NodeListOf<Element>} jugadoresCartas 
 */
export const turnoComputadora = (mazo, puntosJugadores, puntosHTML, jugadoresCartas) => {
    let puntosASuperar = Math.max(...puntosJugadores);
    let puntosCPU = 0;
    do {
        const carta = pedirCarta(mazo);
        let turnoCPU = puntosJugadores.length - 1;
        puntosCPU = actualizarPuntos(carta, turnoCPU, puntosJugadores, puntosHTML);
        agregarCartaDOM(carta, turnoCPU, jugadoresCartas);

    } while ((puntosCPU < puntosASuperar) && (puntosCPU <= 21));

    anunciarGanador(puntosJugadores, puntosHTML, puntosCPU);
};