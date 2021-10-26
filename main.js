import { getRandom } from "./tools.js";
import { createLogMessage } from './logging.js';
import { initPlayer } from "./players.js";
import { getRandomPlayer } from "./characters.js";

const $arena = document.querySelector('.arenas');
const $control = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = initPlayer(getRandomPlayer(), 1);
const player2 = initPlayer(getRandomPlayer(), 2);

function createPlayer(character) {
    const { position, hp, name, img } = character;

    const $player = document.createElement('div');
    $player.classList.add(`player${position}`);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add(`progressbar`);

    const $life = document.createElement('div');
    $life.classList.add(`life`);
    $life.style.width = `${hp}%`;

    const $name = document.createElement('div');
    $name.classList.add(`name`);
    $name.innerHTML = name;

    const $character = document.createElement('div');
    $character.classList.add(`character`);

    const $image = document.createElement('img');
    $image.src = img;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($image);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function createReloadButton() {
    const $reloadWrap = document.createElement('div');
    $reloadWrap.classList.add('reloadWrap');

    const $button = document.createElement('button');
    $button.classList.add('button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.reload();
    });
    $reloadWrap.appendChild($button);
    return $reloadWrap;
}

const createOutcomeMessage = function (msg) {
    const $wintitle = document.createElement('div');
    $wintitle.classList.add('winTitle');
    $wintitle.innerText = msg;
    return $wintitle;
};

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

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

function doRandomAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const block = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        block
    };
}

function readControls($form) {
    const formData = {};
    for (let item of $control) {
        if (item.checked === true && item.name === 'hit') {
            formData.value = getRandom(HIT[item.value]);
            formData.hit = item.value;
        }
        if (item.checked === true && item.name === 'defence') {
            formData.block = item.value;
        }
    }
    return formData;
}

function clearForm(form) {
    for (let item of form) {
        item.checked = false;
    }
}

function disableForm(form) {
    for (let item of form) {
        item.disabled = true;
    }
}

$control.addEventListener('submit', function (event) {
    event.preventDefault();
    const player1Attack = readControls($control);
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

    clearForm($control);

    if (player1.hp === 0 || player2.hp === 0) {
        disableForm($control);
        determinateWinner();
        $arena.appendChild(createReloadButton());
    }
});

createLogMessage($chat, 'start', player1.name, player2.name);
