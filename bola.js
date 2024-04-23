///configuracion de la pelota .
///actualizacion de estado y movimi8ento de  la pelota
const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREMENTO = 0.00001
export default class Ball{
    constructor(pelota){
        this.pelota = pelota
        this.reset()
    
    }
    //pequeno error aqui tenia mal y era Value
    get x (){
        return parseFloat(getComputedStyle(this.pelota).getPropertyValue("--x"))
    }

    set x(value){
        this.pelota.style.setProperty("--x",value)
    }

    
    get y (){
        return parseFloat(getComputedStyle(this.pelota).getPropertyValue("--y"))
    }

    set y (value){
        this.pelota.style.setProperty("--y",value)
    }

    reat(){
        return this.pelota.getBoundingClientRect()
    }

    //resetear la posicion de la pelota  y el comienso de cada ronda
    reset(){
        this.x = 50
        this.y = 50
        this.direction = {x: 0.75, y:0.5}
        while(
            Math.abs(this.direction.x) <= .2 || 
            Math.abs(this.direction.x) >= .5){
        const heading = randomNumberBetween(0,2 * Math.PI)
        this.direction = { x: Math.cos(heading), y: Math.sin(heading)}
    }
    this.velocidad = INITIAL_VELOCITY
    }

    ///actualizar el movimiento y la aparecion de la pelota
    update(delta ,paletaReacion){
        this.x += this.direction.x * this.velocidad*delta
        this.y += this.direction.y * this.velocidad*delta
        this.velocidad += VELOCITY_INCREMENTO * delta
        const reat = this.reat()

        if(reat.bottom >= window.innerHeight || reat.top <= 0){
            this.direction.y *= -1
        }

        if(paletaReacion.some(r => isCollision(r, reat))){
            this.direction.x *= -1
        }
    }
} 

function randomNumberBetween(min,max){
    return Math.random() * (max - min)+ min
}

function isCollision(rect1, rect2) {
    return (
      rect1.left <= rect2.right &&
      rect1.right >= rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    )
  }