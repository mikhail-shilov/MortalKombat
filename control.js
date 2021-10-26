import { getRandom } from "./tools.js";
import { HIT } from "./coefficients.js";

export function readControl(form) {
    const formData = {};
    for (let item of form) {
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

export function clearControl(form) {
    for (let item of form) {
        item.checked = false;
    }
}

export function disableControl(form) {
    for (let item of form) {
        item.disabled = true;
    }
}
