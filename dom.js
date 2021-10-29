export function createPlayer(character) {
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

export function createReloadButton() {
    const $reloadWrap = document.createElement('div');
    $reloadWrap.classList.add('reloadWrap');

    const $button = document.createElement('button');
    $button.classList.add('button');
    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
        window.location.pathname = 'index.html';
    });
    $reloadWrap.appendChild($button);
    return $reloadWrap;
}

export const createOutcomeMessage = function (msg) {
    const $wintitle = document.createElement('div');
    $wintitle.classList.add('winTitle');
    $wintitle.innerText = msg;
    return $wintitle;
};
