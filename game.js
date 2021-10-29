import { Player } from "./players.js";
import { getRandomPlayer } from "./characters.js";
import { createPlayer, createReloadButton, createOutcomeMessage } from "./dom.js";
import { readControl, clearControl, disableControl } from "./control.js";
import { doRandomAttack } from "./ai.js";
import { Log } from './log.js';

export class Game {
    constructor() {
        this.$arena = document.querySelector('.arenas');
        this.$chat = document.querySelector('.chat');
        this.$control = document.querySelector('.control');
        this.log = new Log(this.$chat);
        this.player1 = null;
        this.player2 = null;
    }
    start() {
        this.$control.addEventListener('submit', (event) => {
            event.preventDefault();
            this.doKick();
        });

        this.player1 = new Player(1, getRandomPlayer());
        this.$arena.appendChild(createPlayer(this.player1));

        this.player2 = new Player(2, getRandomPlayer());
        this.$arena.appendChild(createPlayer(this.player2));

        //        createLogMessage(this.$chat, 'start', this.player1.name, this.player2.name);
        this.log.start(this.player1.name, this.player2.name);
    }
    doKick() {
        const player1Attack = readControl(this.$control);
        const player2Attack = doRandomAttack();

        if (player1Attack.hit !== player2Attack.block) {
            this.player2.changeHP(player1Attack.value);
            this.player2.renderHP(this.player2.elHP());
            this.log.hit(this.player1.name, this.player2.name, player1Attack.value, this.player2.hp);
        } else {
            this.log.block(this.player1.name, this.player2.name);
        }

        if (player2Attack.hit !== player1Attack.block) {
            this.player1.changeHP(player2Attack.value);
            this.player1.renderHP(this.player1.elHP());
            this.log.hit(this.player2.name, this.player1.name, player2Attack.value, this.player1.hp);

        } else {
            this.log.block(this.player2.name, this.player1.name);
        }

        clearControl(this.$control);

        if (this.player1.hp === 0 || this.player2.hp === 0) {
            if (this.player1.hp <= 0 && this.player2.hp <= 0) {
                this.$arena.appendChild(createOutcomeMessage('Draw'));
            } else {
                if (this.player1.hp <= 0) {
                    this.$arena.appendChild(createOutcomeMessage(`${this.player2.name} wins!`));
                    this.log.end(this.player2.name, this.player1.name);
                }
                if (this.player2.hp <= 0) {
                    this.$arena.appendChild(createOutcomeMessage(`${this.player1.name} wins!`));
                    this.log.end(this.player1.name, this.player2.name);
                }
            }
            this.$arena.appendChild(createReloadButton());
            disableControl(this.$control);
        }
    }
}