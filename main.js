console.log('Start game!');

const scorpion = {
    name: 'Scorpion',
    hp: 100,
    img: '',
    weapon: ['snake'],
    attack: function () {
        console.log(`${this.name} fight!`)
    }
}

const subzero = {
    name: 'Subzero',
    hp: 100,
    img: '',
    weapon: ['frost'],
    attack: function () {
        console.log(`${this.name} fight!`)
    }
}

function createPlayer(playerPosition, fighter) {
    console.log(playerPosition);
    console.log(fighter);

}

createPlayer('fff', 'ttt')
console.log(scorpion.attack())
console.log(subzero.attack())