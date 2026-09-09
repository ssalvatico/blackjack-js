import { turnoComputadora } from './computer-logic'

const btnPedir    = document.querySelector('#boton-pedir'),
      btnQuedarse = document.querySelector('#boton-quedarse');

/**
 * Cambia el estado de los botones en caso de ser necesario
 */
export const switchBtns = () => {
    btnPedir.disabled = !btnPedir.disabled;
    btnQuedarse.disabled = !btnQuedarse.disabled;
};

/**
 * 
 * @param {string[]} mazo 
 * @param {number} turnoJugador 
 * @param {number[]} puntosJugadores 
 * @param {NodeListOf<HTMLElement>} puntosHTML 
 * @param {NodeListOf<Element>} jugadoresCartas 
 * @returns {number} Turno del jugador actual
 */
export const cederTurno = (mazo, turnoJugador, puntosJugadores, puntosHTML, jugadoresCartas) => {
    turnoJugador++;
    if(turnoJugador == puntosJugadores.length - 1){
        alert('Turno de la computadora');
        switchBtns(btnPedir, btnQuedarse);
        turnoComputadora(mazo, puntosJugadores, puntosHTML, jugadoresCartas);
    }
    else {
        alert(`Turno del jugador ${turnoJugador + 1}`);
    }
    return turnoJugador;
}