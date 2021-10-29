export class Player {
    constructor(position, { name, img }) {
        this.position = position;
        this.name = name;
        this.img = img;
        this.hp = 100;
    }
    changeHP(hp) {
        this.hp = this.hp < hp ? 0 : this.hp - hp;
    }
    elHP() {
        return document.querySelector(`.player${this.position} .life`);
    }
    renderHP(el) {
        el.style.width = `${this.hp}%`;
    }
}