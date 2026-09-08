/**
 * Anuncia a los ganadores del juego
 * @param {number[]} puntosJugadores 
 * @param {NodeListOf<HTMLElement>} puntosHTML 
 * @param {number} puntosCPU 
 * @returns {void}
 */
export const anunciarGanador = (puntosJugadores, puntosHTML, puntosCPU) => {
    setTimeout(()=>{
        let ganadores = [];
        let mensaje = 'No ganó nadie';
        for(let i = 0; i < puntosJugadores.length - 1; i++){
            const puntosJugador = puntosJugadores[i];
            const puntosJugadorHTML = puntosHTML[i];
            if(puntosJugador === 0 || ((puntosCPU >= puntosJugador) && (puntosCPU <= 21))){
                puntosJugadorHTML.style.color = "#b10000";
            } else {
                ganadores.push(i + 1);
                puntosJugadorHTML.style.color = "#2ddb1d";
            }
        }
        if(ganadores.length > 0) {
            mensaje = 'Ganaron los jugadore(s):'
            for(let j = 0; j < ganadores.length; j++){
                mensaje += ((j === ganadores.length - 1) && (ganadores.length > 1)) ? ` y ${ganadores[j]}.` : ` ${ganadores[j]}`;
            }
            mensaje += '\nFelicitaciones!';
        }
        alert(mensaje);
    }, 300);
};