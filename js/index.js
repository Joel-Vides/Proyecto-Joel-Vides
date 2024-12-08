let audio = new Audio('/audio/Click.mp3')

let boton = document.getElementsByClassName('boton')

boton.addEventListener('click', () =>{
    
    audio.play()
    
})