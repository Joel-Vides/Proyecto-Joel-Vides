//Iniciar Variables
let cartasVolteadas = 0;
let carta1 = null;
let carta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = 0;
let tiempo = 0;
let segundos = 0;
let minutos = 0;
let Contador = 0;
let timer;


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


//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');

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

        if (minutos == 10) {
            mostrarTiempo.innerHTML = `Tiempo: 10:00`;
            console.log(tiempo);
            return;
        }

        if (segundos < 10) {
            mostrarTiempo.innerHTML = `Tiempo: 0${minutos}:0${segundos}`;
        }else if(segundos >= 10){
            mostrarTiempo.innerHTML = `Tiempo: 0${minutos}:${segundos}`;
        }

        if (segundos < 10 && minutos < 10) {
            mostrarTiempo.innerHTML = `Tiempo: 0${minutos}:0${segundos}`;
        } 

        if(segundos >= 60){
            segundos = 0;
            minutos++;
            mostrarTiempo.innerHTML = `Tiempo: 0${minutos}:0${segundos}`;
        }else if(minutos >= 10){
            mostrarTiempo.innerHTML = `Tiempo: ${minutos}:0${segundos}`;
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
                mostrarTiempo.innerHTML = `Tiempo: ${minutos}:${segundos}!`;
                clearInterval(timer);
                puntuacion(movimientos, tiempo);

                audioFinal();
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
reiniciarCartas(numeros, id);

function reiniciarCartas() {
    const botonReiniciar = document.querySelector('.reiniciar');
    botonReiniciar.addEventListener('click', () => {
        numeros = numeros.sort(() => {

            numeros = numeros.sort(() => {
                return Math.random()-0.5;
                console.log(numeros);
            
            });

            reverso(id);
        
        });
        
    })
}

function puntuacion() {
    let puntosIntentos = 0;
    let puntosTiempo = 200;

    const puntos = document.querySelector('#p1');
    const mostrarPuntuacion = document.querySelector('#puntuacion');

    if (movimientos == 8) {
        puntosIntentos = 100;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    }else if (movimientos > 8 && movimientos <= 12) {
        puntosIntentos = 80;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    } else if (movimientos >12 && movimientos <= 15) {
        puntosIntentos = 60;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    } else if (movimientos >15 && movimientos <= 20) {
        puntosIntentos = 40;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    } else if (movimientos >20 && movimientos <= 25) {
        puntosIntentos = 20;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    } else if (movimientos >25) {
        puntosIntentos = 10;
        puntos.innerHTML = `1-> ${puntosIntentos}`;
    }

    mostrarPuntuacion.innerHTML = `Puntuación: ${puntosIntentos}`
    // setInterval(() => {
    //     let hola = 0;
    //     hola++;
    // if (tiempo <= 20) {
    //     console.log('es Menor a 30');
    //     puntosTiempo = 200;   
    // }else if (tiempo > 20 && tiempo <= 40) {
    //     puntosTiempo--;
            
    // }else if (tiempo > 40 && tiempo <= 60) {

    //         puntosTiempo = puntosTiempo-2;

    // }else if (tiempo > 60 && tiempo <= 80) {

    //         puntosTiempo = puntosTiempo-3;
    // }
    // }, 1000)

}



//En JavaScript, innerHTML es una propiedad que se utiliza para acceder
//o modificar el contenido HTML de un elemento. Puedes pensar en innerHTML
//como una forma de leer o escribir el HTML interno de un elemento en tu
//página web.

// La función setTimeout en JavaScript se utiliza para ejecutar una función
// o un fragmento de código después de un intervalo de tiempo especificado.
// Esta función es muy útil cuando necesitas retrasar la ejecución de una
// tarea. Aquí te explico en detalle cómo funciona: