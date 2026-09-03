# 🃏 BlackJack JS

Juego simplificado de BlackJack (21) para 1 a 3 jugadores contra la computadora, hecho con **JavaScript vanilla** (patrón módulo), **HTML5** y **Bootstrap 5**.

## 🎮 Demo

> Agregá acá el link si lo publicás con GitHub Pages, por ejemplo:
> `https://tu-usuario.github.io/blackjack-js/`

## ✨ Características

- Soporte para 1 a 3 jugadores simultáneos + computadora (CPU).
- Mazo de 52 cartas generado dinámicamente y mezclado con [Underscore.js](https://underscorejs.org/).
- As vale 11 u 1 según convenga (evita pasarse de 21 automáticamente cuando es posible).
- Turnos por jugador con anuncio de ganador/es al finalizar.
- Interfaz responsive con Bootstrap 5.

## 🛠️ Tecnologías

- JavaScript (ES6+, patrón módulo / IIFE)
- HTML5 + CSS3
- Bootstrap 5.3
- Underscore.js (para `_.shuffle`)

## 🚀 Cómo jugar localmente

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/blackjack-js.git
   ```
2. Abrí `index.html` en tu navegador.
3. Hacé clic en **"Nuevo Juego"** e indicá la cantidad de jugadores (1 a 3).
4. Usá **"Pedir carta"** para sumar puntos y **"Quedarse"** para pasar el turno.

## 📂 Estructura del proyecto

```
blackjack-js/
├── assets/
│   ├── cartas/       # Imágenes de las 52 cartas
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── juego.js       # Lógica del juego
│       └── juego-min.js   # Versión minificada
├── index.html
└── README.md
```

## 📝 Notas de aprendizaje

Este proyecto usa el **patrón módulo** (función autoinvocada) para encapsular la lógica del juego y evitar contaminar el scope global.


