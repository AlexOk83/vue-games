export function isEqualArray(arr1, arr2) {
    // в фильтре убираем все совпадения
    let isNormal = true;
    arr1.forEach((item, index) => {
        if (item !== arr2[index]) {
            isNormal = false;
        }
    });

    return arr1.length === arr2.length && isNormal
}

export function up(minutes, limit) {
    let m = Number(minutes) + 1;
    if (m < 10) {
        return `0${m}`
    }

    if (m === limit) {
        return '00'
    }

    return m
}