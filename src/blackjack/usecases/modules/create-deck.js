import { shuffle } from 'underscore';

const cartasEspeciales    = ['A','J','Q','K']

/**
 * Esta funcion crea un nuevo mazo y lo mezcla
 * @param {string[]} cartasEspeciales  ['A', 'J', 'Q', 'K'] 
 * @returns {string[]}
 */
export const generarMazo = () => {
    let mazo = [];
    for(let i = 2; i <= 10; i++){
        mazo.push(i + 'C');
        mazo.push(i + 'D');
        mazo.push(i + 'S');
        mazo.push(i + 'H');
    }
    for(let especial of cartasEspeciales){
        mazo.push(especial + 'C');
        mazo.push(especial + 'D');
        mazo.push(especial + 'S');
        mazo.push(especial + 'H');
    }
    return shuffle(mazo);
};