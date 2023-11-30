// 防抖
export const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.call(this, ...args);
        }, delay);
    };
};

export const judgePhaseCycleInstanceStyle = (number) => {
    switch (number) {
        case 0:
            return {
                imgDescText: '南北左转',
                imgNorthLeft: true,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: true,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 1:
            return {
                imgDescText: '北向通行',
                imgNorthLeft: true,
                imgNorthRight: true,
                imgNorthStraight: true,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 2:
            return {
                imgDescText: '南向通行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: true,
                imgSouthRight: true,
                imgSouthStraight: true,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 3:
            return {
                imgDescText: '南北通行',
                imgNorthLeft: true,
                imgNorthRight: true,
                imgNorthStraight: true,
                imgSouthLeft: true,
                imgSouthRight: true,
                imgSouthStraight: true,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 4:
            return {
                imgDescText: '东西左转',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: true,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: true,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 5:
            return {
                imgDescText: '东向通行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: true,
                imgEastRight: true,
                imgEastStraight: true
            };
        case 6:
            return {
                imgDescText: '西向通行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: true,
                imgWestRight: true,
                imgWestStraight: true,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 7:
            return {
                imgDescText: '东西通行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: true,
                imgWestRight: true,
                imgWestStraight: true,
                imgEastLeft: true,
                imgEastRight: true,
                imgEastStraight: true
            };
        case 8:
            return {
                imgDescText: '南北直行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: true,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: true,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 9:
            return {
                imgDescText: '东西直行',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: true,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: true
            };
        case 10:
            return {
                imgDescText: '南北直右',
                imgNorthLeft: false,
                imgNorthRight: true,
                imgNorthStraight: true,
                imgSouthLeft: false,
                imgSouthRight: true,
                imgSouthStraight: true,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 11:
            return {
                imgDescText: '东西直右',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: true,
                imgWestStraight: true,
                imgEastLeft: false,
                imgEastRight: true,
                imgEastStraight: true
            };
        case 12:
            return {
                imgDescText: '南北左右',
                imgNorthLeft: true,
                imgNorthRight: true,
                imgNorthStraight: false,
                imgSouthLeft: true,
                imgSouthRight: true,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 13:
            return {
                imgDescText: '东西左右',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: true,
                imgWestRight: true,
                imgWestStraight: false,
                imgEastLeft: true,
                imgEastRight: true,
                imgEastStraight: false
            };
        case 14:
            return {
                imgDescText: '南向直左',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: true,
                imgSouthRight: false,
                imgSouthStraight: true,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
        case 15:
            return {
                imgDescText: '东向直左',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: true,
                imgEastRight: false,
                imgEastStraight: true
            };
        default:
            return {
                imgDescText: '未知',
                imgNorthLeft: false,
                imgNorthRight: false,
                imgNorthStraight: false,
                imgSouthLeft: false,
                imgSouthRight: false,
                imgSouthStraight: false,
                imgWestLeft: false,
                imgWestRight: false,
                imgWestStraight: false,
                imgEastLeft: false,
                imgEastRight: false,
                imgEastStraight: false
            };
    }
}