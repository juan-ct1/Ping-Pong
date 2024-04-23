//actualizar los loops
//importa la pelota 
import Ball from './bola.js'
import Paleta from './paleta.js'

const ball = new Ball(document.getElementById("bola"))
const paletaJugador = new Paleta( document.getElementById("paleta-jugador"))
const paletaComputador = new Paleta( document.getElementById("paleta-computadora"))
const jugadorScore = document.getElementById("jugador-p")
const ComputadoraScore = document.getElementById("computadora-p")

//tiempo
let lastTime
function update(time){
    if(lastTime != null){
        const delta = time -lastTime
        //actualizar el codigo
       // console.log(delta)
       ball.update(delta, [paletaJugador.reat(), paletaComputador.reat()])
       paletaComputador.update(delta, ball.y)
       const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

      // document.documentElement.style.setProperty("--hue", hue + delta * 0.01)


       if(islose()) handlelose()
    }

   
    lastTime = time
    window.requestAnimationFrame(update)
}

function islose(){
    const reat = ball.reat()
    return reat.right >= window.innerWidth || reat.left <= 0
}

function handlelose (){
    const reat = ball.reat()
    if(reat.right >= window.innerWidth){
        jugadorScore.textContent = parseInt(jugadorScore.textContent) + 1
    }else {
        ComputadoraScore.textContent = parseInt(ComputadoraScore.textContent) + 1
    }
    ball.reset()
    paletaComputador.reset()
}

document.addEventListener("mousemove", e =>{
    paletaJugador.position = (e.y / window.innerHeight) *  100
})

window.requestAnimationFrame(update)
