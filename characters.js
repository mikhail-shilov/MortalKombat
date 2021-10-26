import { getRandom } from "./tools.js";

export const characters = [
    {
        name: 'Scorpion',
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['snake'],
        attack: function () {
            console.log(`${this.name} fight!`);
        }
    },
    {
        name: 'Subzero',
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['frost'],
        attack: function () {
            console.log(`${this.name} fight!`);
        }
    }
];

let choosenCharacters = [];

export function getRandomPlayer() {
    const availableCaracters = characters.filter((item, index) => !choosenCharacters.includes(index));
    const choosenIndex = getRandom(availableCaracters.length) - 1;
    choosenCharacters = [...choosenCharacters, choosenIndex];
    return availableCaracters[choosenIndex];
}
