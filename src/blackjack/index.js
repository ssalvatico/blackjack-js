import {generarMazo, pedirCarta, actualizarPuntos, agregarCartaDOM, switchBtns, cederTurno} from './usecases/index'

const moduloBlackJack = (() => {
    'use strict'
    
    ///////////////////////////////////////////////////////////////////////////

    /** @type {string[]} */
    let mazo;
    
    /** @type {number[]} */
    let puntosJugadores = [];
    
    /** @type {number} */
    let turnoJugador = 0;
    
    /** @type {NodeListOf<Element>} */
    let jugadoresCartas;
    
    /** @type {NodeListOf<HTMLElement>} */
    let puntosHTML;
    
    // Botones
    const btnPedir        = document.querySelector('#boton-pedir'),
          btnNuevo        = document.querySelector('#boton-nuevo'),
          btnQuedarse     = document.querySelector('#boton-quedarse');
    
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Crea los jugadores en el DOM
     * @param {number} numJugadores 
     */
    const crearJugadores = (numJugadores) => {
        const cartas_computadora = document.querySelector('#cartas-computadora');
        const row_jugadores = document.querySelector('#row-jugadores');
        row_jugadores.innerHTML = '';
        for(let i = 0; i < numJugadores; i++){
            row_jugadores.innerHTML += `
            <div class="col">
                <h3>Jugador ${i + 1}: <small>0</small></h3>
                <div class="jugador-cartas"></div>
            </div>`;
        }
        cartas_computadora.innerHTML = ''; 
        puntosHTML = document.querySelectorAll('small');
        puntosHTML[numJugadores].innerHTML = 0;
        jugadoresCartas = document.querySelectorAll('.jugador-cartas');
    };
    
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Inicia el juego de BlackJack
     */
    const inicializarJuego = () => {
        let numJugadores = prompt('Inserte el numero de jugadores (1 a 3)', 1);
        if(!numJugadores || numJugadores < 1 || numJugadores > 3){
            alert('Inserte un numero válido de jugadores');
            throw('Entrada inválida');
        }
        mazo = generarMazo();
        puntosJugadores = [];
        turnoJugador = 0;
        if(btnPedir.disabled && btnQuedarse.disabled) { switchBtns(btnPedir, btnQuedarse); }
        for(let i = 0; i <= numJugadores; i++){
            puntosJugadores.push(0);
        }
        crearJugadores(numJugadores);
    };
    
    ///////////////////////////////////////////////////////////////////////////

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(mazo);
        const puntosJugador = actualizarPuntos(carta, turnoJugador, puntosJugadores, puntosHTML);
        agregarCartaDOM(carta, turnoJugador, jugadoresCartas);
        if(puntosJugador >= 21){
            setTimeout(()=>{
                puntosJugadores[turnoJugador] = (puntosJugador > 21) ? 0 : puntosJugador;
                turnoJugador = cederTurno(mazo, turnoJugador, puntosJugadores, puntosHTML, jugadoresCartas);
            }, 300);
        }
    });
    
    ///////////////////////////////////////////////////////////////////////////

    btnQuedarse.addEventListener('click', () => {
        if(puntosJugadores[turnoJugador] === 0){
            alert('Debes pedir al menos una carta');
        } else {
            turnoJugador = cederTurno(mazo, turnoJugador, puntosJugadores, puntosHTML, jugadoresCartas);
        }
    });
    
    ///////////////////////////////////////////////////////////////////////////

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });
    
    ///////////////////////////////////////////////////////////////////////////

    return {
        nuevoJuego: inicializarJuego
    };
})();