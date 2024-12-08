let base_preguntas = readText("preguntas.json");
let interpretePreguntas = JSON.parse(base_preguntas);
let pregunta;

function preguntaAleatoria() {
    escogerPregunta(Math.floor(Math.random()*interpretePreguntas.lenght))
}

escogerPregunta(0);
function escogerPregunta(n) {

    pregunta = interpretePreguntas[n];
    select_id("pregunta").innerHTML = pregunta.pregunta;

    select_id("boton1").innerHTML = pregunta.incorrecta1;  
    select_id("boton2").innerHTML = pregunta.respuesta;  
    select_id("boton3").innerHTML = pregunta.incorrecta2;  
    select_id("boton4").innerHTML = pregunta.incorrecta3;
}

let botones = [
    select_id("boton1"),
    select_id("boton2"),
    select_id("boton3"),
    select_id("boton4")
]

function desordenarRespuestas(pregunta) {
    let posiblesRespuestas = [
        pregunta.respuesta,
        pregunta.incorrecta1,
        pregunta.incorrecta2,
        pregunta.incorrecta3
    ];

    posiblesRespuestas.sort(() => Math.random()-0.5);

    select_id("boton1").innerHTML = posiblesRespuestas[0];  
    select_id("boton2").innerHTML = posiblesRespuestas[1];  
    select_id("boton3").innerHTML = posiblesRespuestas[2];  
    select_id("boton4").innerHTML = posiblesRespuestas[3];
}

function escogerRespuesta(i) {
    console.log(posiblesRespuestas[i]);
    
}

function select_id(id) {
    return document.getElementById(id);
}

function style(id) {
    return select_id(id).style;
}

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}