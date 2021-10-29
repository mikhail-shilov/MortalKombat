export const getRandom = (range) => Math.ceil(Math.random() * range);


export const getTime = () => {
    const date = new Date();
    const time = {
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()
    };

    for (let item in time) {
        time[item] = time[item].toString().length > 1 ? `${time[item]}` : `0${time[item]}`;
    }
    
    return `${time.hh}:${time.mm}:${time.ss}`;
};