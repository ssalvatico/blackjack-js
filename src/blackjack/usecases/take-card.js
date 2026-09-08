/**
 * Quita la primer carta del mazo y la retorna como string
 * @param {string[]} mazo 
 * @returns {string} Ejemplo: '2A'
 */
const pedirCarta = (mazo) => {
    if(!mazo || mazo.length === 0) throw new Error('variable: mazo es undefined o vacía');
    return mazo.pop();
}

export default pedirCarta;