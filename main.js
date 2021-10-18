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
    attack: function () {
        console.log(`${this.name} fight!`)
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
}

const player2 = {
    name: 'Subzero',
    position: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['frost'],
    attack: function () {
        console.log(`${this.name} fight!`)
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
}

function createPlayer(character) {
    const fighter = { ...character }

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

    return $player
}

function createReloadButton() {
    const $reloadWrap = document.createElement('div');
    $reloadWrap.classList.add('reloadWrap');

    const $button = document.createElement('button');
    $button.classList.add('button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($button);
    return $reloadWrap;
}

$arena = document.querySelector('.arenas');
$randomButton = document.querySelector('.button');

const playerWin = function (name) {
    const $wintitle = document.createElement('div')
    $wintitle.classList.add('winTitle')
    $wintitle.innerText = `${name} wins!`
    $randomButton.disabled = true
    return $wintitle
}

const checkHP = function () {
    if (player1.hp <= 0 && player2.hp <= 0) {
        console.log('World crashed!')
        $arena.appendChild(playerWin('No one'))
    } else {
        if (player1.hp <= 0) {
            $arena.appendChild(playerWin(player2.name))
        }

        if (player2.hp <= 0 && player2.hp <= 0) {
            $arena.appendChild(playerWin(player1.name))
        }
    }
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player1.renderHP(player1.elHP());
    player2.changeHP(getRandom(20));
    player2.renderHP(player2.elHP());
    checkHP();
})

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
$arena.appendChild(createReloadButton());
