import { getRandom } from "./tools.js";
import { HIT, ATTACK } from "./coefficients.js";

export function doRandomAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const block = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        block
    };
}
