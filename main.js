$arena = document.querySelector('.arenas');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];


function getRandom(range) {
    return Math.ceil(Math.random() * range)
}

function changeHP(hp) {
    this.hp = this.hp < hp ? 0 : this.hp - hp;
}

function elHP() {
    return document.querySelector(`.player${this.position} .life`);
}

function renderHP(el) {
    el.style.width = `${this.hp}%`;
}

const player1 = {
    name: 'Scorpion',
    position: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['snake'],
    attack: function() {
        console.log(`${this.name} fight!`)
    },
    changeHP,
    elHP,
    renderHP
}

const player2 = {
    name: 'Subzero',
    position: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['frost'],
    attack: function() {
        console.log(`${this.name} fight!`)
    },
    changeHP,
    elHP,
    renderHP
}

function createPlayer(character) {
    const fighter = {...character };

    const $player = document.createElement('div');
    $player.classList.add(`player${fighter.position}`);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add(`progressbar`);

    const $life = document.createElement('div');
    $life.classList.add(`life`);
    $life.style.width = `${fighter.hp}%`;

    const $name = document.createElement('div');
    $name.classList.add(`name`);
    $name.innerHTML = fighter.name;

    const $character = document.createElement('div');
    $character.classList.add(`character`);

    const $image = document.createElement('img');
    $image.src = fighter.img;

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
    $button.addEventListener('click', function() {
        window.location.reload();
    })
    $reloadWrap.appendChild($button);
    return $reloadWrap;
}

$control = document.querySelector('.control')

const displayOutcomeMessage = function(msg) {
    const $wintitle = document.createElement('div');
    $wintitle.classList.add('winTitle');
    $wintitle.innerText = msg;
    return $wintitle;
}

const determinateWinner = function() {
    if (player1.hp <= 0 && player2.hp <= 0) {
        $arena.appendChild(displayOutcomeMessage('Draw'));
    } else {
        if (player1.hp <= 0) {
            $arena.appendChild(displayOutcomeMessage(`${player2.name} wins!`));
        }
        if (player2.hp <= 0) {
            $arena.appendChild(displayOutcomeMessage(`${player1.name} wins!`));
        }
    }
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

function doRandomAttack() {
    const hit = ATTACK[getRandom(3) - 1]
    const block = ATTACK[getRandom(3) - 1]
    console.log(`Hit to ${hit} and block ${block}`)
    return {
        value: getRandom(HIT[hit]),
        hit,
        block
    }
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

function checkDamage(attack, block) {
    return attack.hit !== block.block ? attack.value : 1
}

$control.addEventListener('submit', function(event) {
    event.preventDefault();
    const playerAttack = {}
    for (let item of $control) {
        if (item.checked === true && item.name === 'hit') {
            playerAttack.value = getRandom(HIT[item.value]);
            playerAttack.hit = item.value;
        }
        if (item.checked === true && item.name === 'defence') {
            playerAttack.block = item.value;
        }
    }
    const aiAttack = doRandomAttack()

    player1.changeHP(checkDamage(aiAttack, playerAttack));
    player1.renderHP(player1.elHP());
    player2.changeHP(checkDamage(playerAttack, aiAttack));
    player2.renderHP(player2.elHP());

    clearForm($control);

    if (player1.hp === 0 || player2.hp === 0) {
        disableForm($control);
        determinateWinner();
        $arena.appendChild(createReloadButton());
    }
})