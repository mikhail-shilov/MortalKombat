$arena = document.querySelector('.arenas');
$chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

function createLogMessage($elem, type, attacker, defencer, damage, remain) {
    const logs = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            'Результат удара [playerWins]: [playerLose] - труп',
            '[playerLose] погиб от удара бойца [playerWins]',
            'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        ],
        hit: [
            '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
            '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
            '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
            '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
            '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
            '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
            '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
            '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
            '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
            '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
            '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
            '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
            '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
            '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
            '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
            '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
            '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
            '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        ],
        defence: [
            '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
            '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
            '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
            '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
            '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
            '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        ],
        draw: 'Ничья - это тоже победа!'
    };

    actualDate = new Date;
    function normalize(num) {
        return num.toString().length > 1 ? num : `0${num}`
    }
    actualTime = `${normalize(actualDate.getHours())}:${normalize(actualDate.getMinutes())}:${normalize(actualDate.getSeconds())}`

    let message = '';
    switch (type) {
        case 'start':
            message = logs[type].replace('[time]', actualTime)
                .replace('[player1]', attacker)
                .replace('[player2]', defencer)
            break

        case 'hit':
            message = logs[type][getRandom(logs[type].length) - 1]
            message = message
                .replace('[playerDefence]', defencer)
                .replace('[playerKick]', attacker)
            message = `${actualTime} - ${message} -${damage}HP, ${remain}/100HP`;
            break
        case 'defence':
            message = logs[type][getRandom(logs[type].length) - 1]
            message = message
                .replace('[playerDefence]', defencer)
                .replace('[playerKick]', attacker)
            message = `${actualTime} - ${message}`;
            break
        case 'draw':
            message = logs[type]
            message = `${actualTime} - ${message}`;
            break
        case 'end':
            message = logs[type][getRandom(logs[type].length) - 1]
            message = message
                .replace('[playerLose]', defencer)
                .replace('[playerWins]', attacker)
            message = `${actualTime} - ${message}`;
            break
    }

    const $record = `<p>${message}</p>`
    $elem.insertAdjacentHTML('afterbegin', $record)

}

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
    attack: function () {
        console.log(`${this.name} fight!`)
    },
    changeHP,
    elHP,
    renderHP
}

function createPlayer(character) {
    const fighter = { ...character };

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
    $button.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($button);
    return $reloadWrap;
}

$control = document.querySelector('.control')

const displayOutcomeMessage = function (msg) {
    const $wintitle = document.createElement('div');
    $wintitle.classList.add('winTitle');
    $wintitle.innerText = msg;
    return $wintitle;
}

const determinateWinner = function () {
    if (player1.hp <= 0 && player2.hp <= 0) {
        $arena.appendChild(displayOutcomeMessage('Draw'));
    } else {
        if (player1.hp <= 0) {
            $arena.appendChild(displayOutcomeMessage(`${player2.name} wins!`));
            createLogMessage($chat, 'end', player2.name, player1.name)
        }
        if (player2.hp <= 0) {
            $arena.appendChild(displayOutcomeMessage(`${player1.name} wins!`));
            createLogMessage($chat, 'end', player1.name, player2.name)

        }
    }
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

function doRandomAttack() {
    const hit = ATTACK[getRandom(3) - 1]
    const block = ATTACK[getRandom(3) - 1]
    return {
        value: getRandom(HIT[hit]),
        hit,
        block
    }
}

function readForm($form) {
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
    const player1Attack = readForm($control);
    const player2Attack = doRandomAttack();

    if (player1Attack.hit !== player2Attack.block) {
        player2.changeHP(player1Attack.value);
        player2.renderHP(player2.elHP());
        createLogMessage($chat, 'hit', player1.name, player2.name, player1Attack.value, player2.hp)
    } else {
        createLogMessage($chat, 'defence', player1.name, player2.name)
    }

    if (player2Attack.hit !== player1Attack.block) {
        player1.changeHP(player2Attack.value);
        player1.renderHP(player1.elHP());
        createLogMessage($chat, 'hit', player2.name, player1.name, player2Attack.value, player1.hp)
    } else {
        createLogMessage($chat, 'defence', player2.name, player1.name)
    }

    clearForm($control);

    if (player1.hp === 0 || player2.hp === 0) {
        disableForm($control);
        determinateWinner();
        $arena.appendChild(createReloadButton());
    }
})

console.log(createLogMessage($chat, 'start', player1.name, player2.name))