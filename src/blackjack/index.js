import {generarMazo, pedirCarta, actualizarPuntos, agregarCartaDOM} from './usecases/index'

const moduloBlackJack = (() => {
    'use strict'

    /**
     * S: Spades - Picas
     * C: Clubs - Tréboles
     * D: Diamonds - Diamantes
     * H: Hearts - Corazones
     */
    
    // Variables globales
    let mazo, puntosJugadores = [], turnoJugador = 0, jugadoresCartas, puntosHTML;
    // Botones
    const btnPedir        = document.querySelector('#boton-pedir'),
          btnNuevo        = document.querySelector('#boton-nuevo'),
          btnQuedarse     = document.querySelector('#boton-quedarse');

    ///////////////////////////////////////////////////////////////////////////
    // Funciones del juego/////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Crea numJugadores jugadores
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
    }
    
    // Inicia el juego 
    const inicializarJuego = () => {
        let numJugadores = prompt('Inserte el numero de jugadores (1 a 3)', 1);
        if(!numJugadores || numJugadores < 1 || numJugadores > 3){
            alert('Inserte un numero válido de jugadores');
            throw('Entrada inválida');
        }
        mazo = generarMazo();
        puntosJugadores = [];
        turnoJugador = 0;
        if(btnPedir.disabled && btnQuedarse.disabled) { switchBtns(); }
        for(let i = 0; i <= numJugadores; i++){
            puntosJugadores.push(0);
        }
        crearJugadores(numJugadores);
    };

    ///////////////////////////////////////////////////////////////////////////
    // Funciones orientadas a las cartas///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    // Funciones que manejan el juego /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    const switchBtns = () => {
        btnPedir.disabled = !btnPedir.disabled;
        btnQuedarse.disabled = !btnQuedarse.disabled;
    };

    const cederTurno = () => {
        turnoJugador++;
        if(turnoJugador == puntosJugadores.length - 1){
            alert('Turno de la computadora');
            switchBtns();
            turnoComputadora();
        }
        else {
            alert(`Turno del jugador ${turnoJugador + 1}`);
        }
    }

    const anunciarGanador = (puntosCPU) => {
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
    // puntosJugadores
    const turnoComputadora = () => {
        let puntosASuperar = Math.max(...puntosJugadores);
        let puntosCPU = 0;
        do {
            const carta = pedirCarta(mazo);
            let turnoCPU = puntosJugadores.length - 1;
            puntosCPU = actualizarPuntos(carta, turnoCPU, puntosJugadores, puntosHTML);
            agregarCartaDOM(carta, turnoCPU, jugadoresCartas);

        } while ((puntosCPU < puntosASuperar) && (puntosCPU <= 21));

        anunciarGanador(puntosCPU);
    };

    ///////////////////////////////////////////////////////////////////////////
    // Eventos/////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(mazo);
        const puntosJugador = actualizarPuntos(carta, turnoJugador, puntosJugadores, puntosHTML);
        agregarCartaDOM(carta, turnoJugador, jugadoresCartas);
        if(puntosJugador >= 21){
            puntosJugadores[turnoJugador] = (puntosJugador > 21) ? 0 : puntosJugador;
            cederTurno();
        }
    });

    btnQuedarse.addEventListener('click', () => {
        if(puntosJugadores[turnoJugador] === 0){
            alert('Debes pedir al menos una carta');
        } else {
            cederTurno();
        }
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();