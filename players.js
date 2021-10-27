const dummyPlayer = {
    changeHP(hp) {
        this.hp = this.hp < hp ? 0 : this.hp - hp;
    },
    elHP() {
        return document.querySelector(`.player${this.position} .life`);
    },
    renderHP(el) {
        el.style.width = `${this.hp}%`;
    }
};

export function initPlayer(character, position) {
    const { name, img } = character;
    let player = Object.create(dummyPlayer);
    player.name = name;
    player.img = img;
    player.hp = 100;
    player.position = position;
    return player;
}
