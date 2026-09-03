const moduloBlackJack = (() => {
    'use strict'

    /**
     * S: Spades - Picas
     * C: Clubs - Tréboles
     * D: Diamonds - Diamantes
     * H: Hearts - Corazones
     */
    
    // Variables globales
    let mazo, puntosJugadores = [], turnoJugador = 0, puntosHTML, jugadoresCartas;
    const especiales          = ['A','J','Q','K'],
    // Botones
          btnPedir        = document.querySelector('#boton-pedir'),
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

    // Genero un mazo mezclado
    const generarMazo = () => {
        mazo = [];
        for(let i = 2; i <= 10; i++){
            mazo.push(i + 'C');
            mazo.push(i + 'D');
            mazo.push(i + 'S');
            mazo.push(i + 'H');
        }
        for(let especial of especiales){
            mazo.push(especial + 'C');
            mazo.push(especial + 'D');
            mazo.push(especial + 'S');
            mazo.push(especial + 'H');
        }
        return _.shuffle(mazo);
    };

    // Obtengo una carta del mazo
    const pedirCarta = () => {
        if(mazo.length === 0){
            alert('No se puede pedir carta en un mazo vacío');
            throw('Pedir carta de un mazo vacío');
        }
        return mazo.pop();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Funciones orientadas a las cartas///////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    // Parseo el valor de la carta
    const valorCarta = (carta, turno) => {
        const valor = carta.substring(0, carta.length - 1);
        return !isNaN(valor) ? (valor * 1) : (valor !== 'A') ? 10 : (puntosJugadores[turno] <= 10) ? 11 : 1;
    }

    // Actualizo los puntos al jugador correspondiente en el front
    const actualizarPuntos = (puntos, turno) => {
        puntosJugadores[turno] += puntos;
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    // Renderizo la nueva carta del jugador correspondiente
    const agregarCartaDOM = (carta, turno) => {   
        const nuevaCarta    = document.createElement('img');
        nuevaCarta.id       = carta;
        nuevaCarta.classList.add('carta');
        nuevaCarta.src      = `assets/cartas/${carta}.png`;
        jugadoresCartas[turno].append(nuevaCarta);
    };

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

    const turnoComputadora = () => {
        let puntosASuperar = Math.max(...puntosJugadores);
        let puntosCPU = 0;
        do {
            const carta = pedirCarta();
            puntosCPU = actualizarPuntos(valorCarta(carta, puntosJugadores.length - 1), (puntosJugadores.length - 1));
            agregarCartaDOM(carta, puntosJugadores.length - 1);

        } while ((puntosCPU < puntosASuperar) && (puntosCPU <= 21));

        anunciarGanador(puntosCPU);
    };

    ///////////////////////////////////////////////////////////////////////////
    // Eventos/////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = actualizarPuntos(valorCarta(carta, turnoJugador), turnoJugador);
        agregarCartaDOM(carta, turnoJugador);
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