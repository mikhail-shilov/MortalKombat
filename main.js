const player1 = {
    name: 'Scorpion',
    position: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['snake'],
    attack: function () {
        console.log(`${this.name} fight!`)
    }
}

const player2 = {
    name: 'Subzero',
    position: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['frost'],
    attack: function () {
        console.log(`${this.name} fight!`)
    }
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

$arena = document.querySelector('.arenas');
$randomButton = document.querySelector('.button');

const changeHP = function (player) {
    player.hp -= Math.ceil(Math.random() * 20);
    const $playerLife = document.querySelector(`.player${player.position} .life`);
    $playerLife.style.width = player.hp > 0 ? `${player.hp}%` : '0%';
}

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
    changeHP(player1);
    changeHP(player2);
    checkHP();
})

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

