//configuracion de las paletas
const SPEED = .02
export default class Paleta {
    constructor(paleta){
        this.paleta = paleta
        this.reset()
    }

    get position(){
        return parseFloat(getComputedStyle(this.paleta).getPropertyValue("--position"))
    }

    set position(value){
        this.paleta.style.setProperty("--position",value)
    }
    reat(){
        return this.paleta.getBoundingClientRect()
    }

    reset(){
        this.position =50
    }
    update(delta,bolaaltura){
        this.position += SPEED* delta* (bolaaltura - this.position)
    }
}