//Iniciar Variables
let cartasVolteadas = 0;
let carta1 = null;
let carta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = 0;
let cartasImagenes = null;

// Para el Temporizador
let tiempo = 0;
let segundos = 0;
let segundos2 = 0;
let minutos = 0;
let minutos2 = 0;


let Contador = 0;
let timer;

// Puntos
let puntosIntentos = 0;
let puntosTiempo = 200;
let puntosTotales = 0;


//Sonido de las Cartas
const audio = new Audio('/audio/flipcard.mp3');
const botones = document.querySelectorAll('.carta');
botones.forEach(function(boton) {
    boton.addEventListener('click', () => {
        audio.play(); }); 
});

function audioVictoria() {
    const audioCorrecta = new Audio('/audio/correcto.mp3');
    audioCorrecta.play();
}

function audioFinal() {
    const audioFinal = new Audio('/audio/Victoria.mp3')
    audioFinal.play();
}


//Modificar los valores de las estadisticas HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
let mostrarPuntuacion = document.getElementById('puntuacion');

//Numeros Aleatorios Generacion
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
//sort ordena los numeros deacuerdo a una funcion, recordar
numeros = numeros.sort(() => {
    return Math.random()-0.5;

});
console.log(numeros);

// Funcion para el Temporizador
function tiempoContador() {

    timer = setInterval(() => {
        tiempo++;
        segundos++;

        if (segundos2 < 5 && segundos == 10) {
            segundos = 0;
            segundos2++;
        }else if (segundos2 == 5 && segundos == 10) {
            segundos2 = 0;
            segundos = 0;
            minutos++;
        }else if (minutos == 10) {
            minutos = 0;
            minutos2++;
        }
        mostrarTiempo.innerHTML = `Tiempo: ${minutos2}${minutos}:${segundos2}${segundos}`;


        // Puntuacion del Tiempo
        if (tiempo <= 20) {
            console.log('es Menor a 30');
            puntosTiempo = 200;   
        }else if (tiempo > 20 && tiempo <= 25) {
            puntosTiempo = puntosTiempo - 3;
                
        }else if (tiempo > 25 && tiempo <= 35) {
    
                puntosTiempo = puntosTiempo - 4;
    
        }else if (tiempo > 45 && tiempo <= 80) {
    
                puntosTiempo = puntosTiempo - 5;
        }

    },1000)
}


//Funcion Para Voltear las cartas
function reverso(id) {

    if (temporizador == 0) {
        tiempoContador();
        temporizador = 1;
    }

    cartasVolteadas ++;
    console.log(cartasVolteadas);

    if (cartasVolteadas === 1) {

        //Mostrar el Primer Numero
        carta1 = document.getElementById(id);
        primerResultado = numeros[id];
        carta1.innerHTML = primerResultado;

        //Desabilitar El Primer Boton
        carta1.disabled = true;


    }else if(cartasVolteadas === 2){
        //Mostrar segundo numero
        carta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        carta2.innerHTML = segundoResultado;

        // Desabilitar el segundo boton
        carta2.disabled = true;


        //Aumentar Movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;


        if (primerResultado == segundoResultado) {
            //Reiniciar Contador de Cartas Volteadas
            if (aciertos < 7) {
                audioVictoria();
            }


            cartasVolteadas = 0;
    
            //Aumentar los Aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos}!`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}!`;
                mostrarTiempo.innerHTML = `Tiempo: ${minutos2}${minutos}:${segundos2}${segundos}!`;
                clearInterval(timer);
                puntuacion(movimientos, tiempo);

                audioFinal();

                puntosTotales = puntosIntentos + puntosTiempo;
                mostrarPuntuacion.innerHTML = `Puntuación: ${puntosTotales}`

                console.log(puntosTiempo);
                console.log(puntosIntentos);
                
            }

        }else{
            //Mostrar Momentaneamente valores y ocultar
            setTimeout( () => {
                carta1.innerHTML = '';
                carta2.innerHTML = '';
                carta1.disabled = false;
                carta2.disabled = false;
                cartasVolteadas = 0;
                            
            }, 800);
        }
    }


}


// Boton para Reiniciar
function reiniciarCartas() {
    location.reload();
}

// Funcion para la Puntuacion por los Movimientos
function puntuacion() {
    const puntos = document.querySelector('#p1');


    if (movimientos == 8) {
        puntosIntentos = 300;

    }else if (movimientos == 9) {
        puntosIntentos = 290;

    } else if (movimientos == 10) {
        puntosIntentos = 280;

    } else if (movimientos > 10 && movimientos <= 12) {
        puntosIntentos = 250;

    } else if (movimientos > 12 && movimientos <= 15) {
        puntosIntentos = 220;

    } else if (movimientos > 15 && movimientos <= 17) {
        puntosIntentos = 180;

    } else if (movimientos > 17 && movimientos <= 20) {
        puntosIntentos = 150;

    } else if (movimientos > 20 && movimientos <= 23) {
        puntosIntentos = 120;

    } else if (movimientos > 23 && movimientos <= 26) {
        puntosIntentos = 100;

    } else if (movimientos > 26 && movimientos <= 29) {
        puntosIntentos = 80;

    } else if (movimientos > 30 && movimientos <= 33) {
        puntosIntentos = 60;

    } else if (movimientos > 33 && movimientos <= 36) {
        puntosIntentos = 40;

    } else if (movimientos > 36) {
        puntosIntentos = 20;

    }

}



//En JavaScript, innerHTML es una propiedad que se utiliza para acceder
//o modificar el contenido HTML de un elemento. Puedes pensar en innerHTML
//como una forma de leer o escribir el HTML interno de un elemento en tu
//página web.

// La función setTimeout en JavaScript se utiliza para ejecutar una función
// o un fragmento de código después de un intervalo de tiempo especificado.
// Esta función es muy útil cuando necesitas retrasar la ejecución de una
// tarea. Aquí te explico en detalle cómo funciona: