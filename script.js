// Selecciono todas las cartas
const tarjetas = document.querySelectorAll('.tarjeta-memoria');
const cantidadTotalDeTarjetas = tarjetas.length; // Número total de cartas

let tarjetaVolteada = false; // Indica si ya hay una carta dada vuelta
let tableroBloqueado = false; // Para evitar voltear más de dos cartas a la vez
let primeraTarjeta, segundaTarjeta; // Guarda las cartas que se dieron vuelta

// Función que se activa cuando se da vuelta una carta
function voltearTarjeta() {
    if (tableroBloqueado) return; // Si el tablero está bloqueado no hace nada
    if (this === primeraTarjeta) return; // No voltear la misma carta

    this.classList.add('volteada'); // Agrega la clase para dar vuelta la carta

    if (!tarjetaVolteada) {
        // Primer clic
        tarjetaVolteada = true;
        primeraTarjeta = this;
        return;
    }

    // Segundo clic
    segundaTarjeta = this;
    comprobarPar(); // Verifica si forman un par
}

// Verifica si las cartas forman un par
function comprobarPar() {
    const sonIguales = primeraTarjeta.querySelector('.cara-frontal').src === segundaTarjeta.querySelector('.cara-frontal').src;

    if (sonIguales) {
        desactivarTarjetas(); // Desactiva las cartas si son iguales
    } else {
        desvoltearTarjetas(); // Da vuelta las cartas si no coinciden
    }
    verificarVictoria(); // Verifica si el jugador ha ganado
}

// Desactiva las cartas si son un par
function desactivarTarjetas() {
    primeraTarjeta.removeEventListener('click', voltearTarjeta);
    segundaTarjeta.removeEventListener('click', voltearTarjeta);

    resetearTablero(); // Prepara el tablero para la siguiente jugada
}

// Da vuelta las cartas si no forman un par
function desvoltearTarjetas() {
    tableroBloqueado = true; // Bloquea el tablero para no permitir más clics

    setTimeout(() => {
        primeraTarjeta.classList.remove('volteada');
        segundaTarjeta.classList.remove('volteada');

        resetearTablero(); // Reinicia el tablero para la proxima ronda
    }, 500); // Espera medio segundo antes de dar vuelta las cartas
}

// Reinicia las variables para el proximo turno
function resetearTablero() {
    tarjetaVolteada = false;
    tableroBloqueado = false;
    primeraTarjeta = null;
    segundaTarjeta = null;
}

// Mezcla las cartas al azar
(function mezclarTarjetas() {
    tarjetas.forEach(tarjeta => {
        const posicionAleatoria = Math.floor(Math.random() * tarjetas.length);
        tarjeta.style.order = posicionAleatoria;
    });
})();

// Asigna el evento de clic a cada carta
tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));

// Verifica si todas las cartas estan volteadas y el jugador ha ganado
function verificarVictoria() {
    const tarjetasVolteadas = document.querySelectorAll('.tarjeta-memoria.volteada');
    if (tarjetasVolteadas.length === cantidadTotalDeTarjetas) {
        setTimeout(() => {
            alert('¡Felicidades! ganaste el juego.');

            mezclarTarjetas();
            tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));
        }, 500); // retraso antes de mostrar el mensaje
    }
}
