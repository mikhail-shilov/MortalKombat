import { getRandom } from "./tools.js";
import { HIT, ATTACK } from "./coefficients.js";

export const generateRandomAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence
    };
};

export const useExternalAI = async (hit, defence) => {
    const response = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({ hit, defence })
    }).then(response => response.json()).catch(() => {
        console.log('External AI error. Artificial? Yes. Intelligence? No. Using random.');
        return ({
            "player1": {
                "value": getRandom(HIT[hit]),
                "hit": "head",
                "defence": "head"
            },
            "player2": generateRandomAttack()
        });
    });
    return response;
};