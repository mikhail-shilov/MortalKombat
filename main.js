import { initPlayer } from "./players.js";
import { getRandomPlayer } from "./characters.js";
import { createPlayer, createReloadButton, createOutcomeMessage } from "./dom.js";
import { readControl, clearControl, disableControl } from "./control.js";
import { doRandomAttack } from "./ai.js";
import { createLogMessage } from './log.js';

const $arena = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $control = document.querySelector('.control');

const player1 = initPlayer(getRandomPlayer(), 1);
const player2 = initPlayer(getRandomPlayer(), 2);
$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

const determinateWinner = function () {
    if (player1.hp <= 0 && player2.hp <= 0) {
        $arena.appendChild(createOutcomeMessage('Draw'));
    } else {
        if (player1.hp <= 0) {
            $arena.appendChild(createOutcomeMessage(`${player2.name} wins!`));
            createLogMessage($chat, 'end', player2.name, player1.name);
        }
        if (player2.hp <= 0) {
            $arena.appendChild(createOutcomeMessage(`${player1.name} wins!`));
            createLogMessage($chat, 'end', player1.name, player2.name);

        }
    }
};

$control.addEventListener('submit', function (event) {
    event.preventDefault();
    const player1Attack = readControl($control);
    const player2Attack = doRandomAttack();

    if (player1Attack.hit !== player2Attack.block) {
        player2.changeHP(player1Attack.value);
        player2.renderHP(player2.elHP());
        createLogMessage($chat, 'hit', player1.name, player2.name, player1Attack.value, player2.hp);
    } else {
        createLogMessage($chat, 'defence', player1.name, player2.name);
    }

    if (player2Attack.hit !== player1Attack.block) {
        player1.changeHP(player2Attack.value);
        player1.renderHP(player1.elHP());
        createLogMessage($chat, 'hit', player2.name, player1.name, player2Attack.value, player1.hp);
    } else {
        createLogMessage($chat, 'defence', player2.name, player1.name);
    }

    clearControl($control);

    if (player1.hp === 0 || player2.hp === 0) {
        disableControl($control);
        determinateWinner();
        $arena.appendChild(createReloadButton());
    }
});

createLogMessage($chat, 'start', player1.name, player2.name);
