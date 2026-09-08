import { shuffle } from 'underscore';

/**
 * Esta funcion crea un nuevo mazo y lo mezcla
 * @param {string[]} cartasEspeciales Ejemplo: ['A', 'J', 'Q', 'K'] 
 * @returns {string[]}
 */
const generarMazo = (cartasEspeciales) => {
    if(!cartasEspeciales || cartasEspeciales.length <= 0) throw new Error('variable: cartasEspeciales inválido');
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

export default generarMazo;