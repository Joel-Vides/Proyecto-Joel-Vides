// Para las Preguntas
let Basepreguntas = readText("preguntas.json");
let interpretePreguntas = JSON.parse(Basepreguntas);
let pregunta;
let botonesRespuestas = null;

// Para el Temporizador
let segundos = 60;
let timer;
let contador = 0;


// Para Las Respuestas
let posibleRespuesta;
let botonCorrespondiente = [
    select_id("boton1"),
    select_id("boton2"),
    select_id("boton3"),
    select_id("boton4")
]

// Estadisticas
let preguntasAciertos = 0;
let preguntasErrores = 0;
let cantidadPreguntas = 0;
let puntosAciertos = 0;
let puntosErrores = 0;
let puntuacion = 0;

// Para Modificar Estadisticas
let mostrarErrores = document.getElementById('errores');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');
let mostrarPuntuacion = document.getElementById('puntuacion');
let mostrarCantidadPreguntas = document.getElementById('cantidadPreguntas');

// Sonidos
function audioCorrecto() {
    const audioRespuestaCorrecta = new Audio('/audio/correcto.mp3');
    audioRespuestaCorrecta.play();
}

function audioIncorrecto() {
    const audioRespuestaIncorrecta = new Audio('/audio/Incorrecto.mp3')
    audioRespuestaIncorrecta.play();
}

function findelTiempo() {
    const tiempoFin = new Audio('/audio/Victoria.mp3')
    tiempoFin.play();
}


preguntaAleatoria();
desordenarRespuestas();

// Escoger las Preguntas Aleatoriamente
function preguntaAleatoria() {
    escogerPregunta(Math.floor(Math.random() * interpretePreguntas.length));

    cantidadPreguntas++;
    mostrarCantidadPreguntas.innerHTML = `Cantidad de Preguntas: ${cantidadPreguntas}`;
    mostrarAciertos.innerHTML = `Cantidad de Aciertos: ${preguntasAciertos}`;
    mostrarErrores.innerHTML = `Cantidad de Errores: ${preguntasErrores}`;

}


// Preguntas
function escogerPregunta(n) {

    pregunta = interpretePreguntas[n];

    // Preguntas e Info
    select_id("categoria").innerHTML = pregunta.categoria;
    select_id("pregunta").innerHTML = pregunta.pregunta;
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").objectFit = pregunta.objectFit;

    // Respuestas
    select_id("boton1").innerHTML = pregunta.respuesta;
    select_id("boton2").innerHTML = pregunta.incorrecta1;
    select_id("boton3").innerHTML = pregunta.incorrecta2;
    select_id("boton4").innerHTML = pregunta.incorrecta3;

    if (pregunta.imagen) {
        style("imagen").height = "200px";
        style("imagen").width = "100%";
        style("pregunta").marginTop = "10px";
    }else{
        style("imagen").height = 0;
        style("imagen").width = 0;
        style("pregunta").marginTop = "120px";
    }
    
}

// Arreglo de Botones
let botones = [
    select_id("boton1"),
    select_id("boton2"),
    select_id("boton3"),
    select_id("boton4")
]


// Desordenar Respuestas
function desordenarRespuestas() {
    posibleRespuesta = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ]
    posibleRespuesta.sort(() => Math.random() -0.5);
    select_id("boton1").innerHTML = posibleRespuesta[0];
    select_id("boton2").innerHTML = posibleRespuesta[1];
    select_id("boton3").innerHTML = posibleRespuesta[2];
    select_id("boton4").innerHTML = posibleRespuesta[3];

    
}



// Funcion para Oprimir Boton
let suspenderBotones = false;

function escogerRespuesta(i) {

    if (suspenderBotones) {
        return;
    }

    suspenderBotones = true;

    if (posibleRespuesta[i] == pregunta.respuesta) {
    preguntasAciertos++;
    puntosAciertos = puntosAciertos + 5;
    audioCorrecto();

    if (contador == 0) {
        tiempoContador();
        contador = 1;
    }

      botonCorrespondiente[i].style.background = "lightgreen";
    } else {
        botonCorrespondiente[i].style.background = "pink";
        preguntasErrores++;
        puntosErrores = puntosErrores + 3;
        audioIncorrecto();

        if (contador == 0) {
            tiempoContador()
            contador = 1;
        }
    }

// Para mostrar la respuesta correcta al equivocarse
    for (let j = 0; j < 4; j++) {
      if (posibleRespuesta[j] == pregunta.respuesta) {
        botonCorrespondiente[j].style.background = "lightgreen";
        break;
      }
    }


    setTimeout(() => {
        reiniciar()
        suspenderBotones = false;

    }, 1500);

}


// Funcion para la Siguiente Pregunta
function reiniciar() {
    for (const botones of botonCorrespondiente) {
        botones.style.background = "rgba(255, 255, 255, 0.2)"
    }
    preguntaAleatoria();
    desordenarRespuestas();
}


// Boton para Reiniciar
function botonReiniciar() {
    location.reload();
}


botonesRespuestas = document.getElementById(id);
// Funcion para el temporizador
function tiempoContador() {



    timer = setInterval(() => {
        segundos--;

        mostrarTiempo.innerHTML = `Tiempo: ${segundos} Segundos`;
        if (segundos == 0) {
            puntuacion = (puntosAciertos) - (puntosErrores);
            findelTiempo();
            botonesRespuestas = true;
            
            suspenderBotones = true;
            clearInterval(timer);
            if (puntuacion <= 0) {
                mostrarPuntuacion.innerHTML = `Puntuación: 0`;
                suspenderBotones = true;
            } else{
                mostrarPuntuacion.innerHTML = `Puntuación: ${puntuacion}`;
                suspenderBotones = true;
            }


        }

    },1000)
}





// Seleccionar un Obejeto segun su id
function select_id(id) {
    return document.getElementById(id);
  }
  
//  Obtener el estilo css segun el id
  function style(id) {
    return select_id(id).style;
  }


//Leer Texto en una ruta local   
  function readText(ruta_local) {
    let texto = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
      texto = xmlhttp.responseText;
    }
    return texto;
  }