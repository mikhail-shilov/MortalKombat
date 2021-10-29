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

export const getLocalPlayer = () => {
    const availableCaracters = characters.filter((item, index) => !choosenCharacters.includes(index));
    const choosenIndex = getRandom(availableCaracters.length) - 1;
    choosenCharacters = [...choosenCharacters, choosenIndex];
    return availableCaracters[choosenIndex];
};

export const getRandomPlayer = async () => {
    const url = 'https://reactmarathon-api.herokuapp.com/api/mk/player/choose';
    const result = await fetch(url);
    return result.json();
};


export class Characters {
    constructor() {
        this.localCharacters = [
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
        this.characters = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(result => result.json());
    }
}