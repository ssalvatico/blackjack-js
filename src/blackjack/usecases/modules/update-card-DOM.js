/**
 * Renderiza la carta en el DOM
 * @param {string} carta 
 * @param {number} turno 
 * @param {NodeListOf<Element>} jugadoresCartas 
 * @returns {void}
 */
export const agregarCartaDOM = (carta, turno, jugadoresCartas) => {   
    const nuevaCarta    = document.createElement('img');
    nuevaCarta.id       = carta;
    nuevaCarta.classList.add('carta');
    nuevaCarta.src      = `${import.meta.env.BASE_URL}assets/cartas/${carta}.png`;
    jugadoresCartas[turno].append(nuevaCarta);
};
