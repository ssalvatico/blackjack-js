# 🃏 BlackJack JS

Juego de BlackJack (21) para 1 a 3 jugadores contra la computadora.

> 🔄 **v2.0** — Migrado a **Vite** con una arquitectura por casos de uso (separación entre lógica de negocio y DOM). La versión original en JS vainilla + Bootstrap por CDN está disponible en el tag [`v1.0.0`](../../releases/tag/v1.0.0).

## 🎮 Demo

> https://ssalvatico.github.io/blackjack-js/

## ✨ Características

- Soporte para 1 a 3 jugadores simultáneos + computadora (CPU).
- Mazo de 52 cartas generado dinámicamente y mezclado con Underscore.js.
- As vale 11 o 1 según convenga, para no pasarse de 21 cuando es posible.
- Turnos por jugador con anuncio de ganador/es al finalizar.

## 🏗️ Arquitectura

El proyecto separa la lógica en tres capas:

```
src/
├── main.js                    # punto de entrada
├── style.css
└── blackjack/
    ├── index.js                # conecta el DOM con los casos de uso
    └── usecases/
        ├── index.js             # archivo de barril
        └── modules/             # funciones puras, sin estado propio
            ├── create-deck.js
            ├── take-card.js
            ├── card-values.js
            ├── update-card-DOM.js
            ├── turn-logic.js
            ├── computer-logic.js
            └── announce-winner.js
```

- **`modules/`** → lógica pura (mazo, valores de carta, DOM), reciben todo por parámetro, fáciles de testear.
- **`usecases/index.js`** → exporta las funciones de los módulos para que blackjack/index.js las utilice 
- **`blackjack/index.js`** → su única función es iniciar el juego y manejar los eventos de los botones

## 🛠️ Tecnologías

- Vite
- JavaScript (ES Modules)
- Bootstrap 5
- Underscore.js (`_.shuffle`)
