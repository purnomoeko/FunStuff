const _ = require('lodash');


// Get how many possiblity combination from array given
const getPossibility = (data) => {
    const dataMap = data.map(o => {
        if (typeof o === 'string') return 1;
        if (Array.isArray(o)) return o.length;
        return 0;
    });

    let totalPossibilities = 1;
    dataMap.forEach(o => {
        totalPossibilities = totalPossibilities * o;
    });
    return { totalPossibilities, dataMap };
}

// Transforming all element into 2dimension array to easier operation
const transformAllTo2DArray = (array) => {
    return array.map(o => typeof o === 'string' ? [o] : o);
};


// Recursive function to iterate deep array dimension
/**
 * 
 * @param {*} list : array parameter to iterate
 * @param {*} n : current interation indicator
 * @param {*} result: end result of iteration
 * @param {*} currentString: string that is collected
 */
const findCombinationRecursive = (list, n = 0, result = [], currentString = [])  => {
    if (n === list.length) {
        result.push(currentString);
    } else {
        list[n].forEach(item => findCombinationRecursive(
            list, n + 1, result, [...currentString, item])
        );
    }
    return result;
}
exports.findCombination = (data) => {
    const newData = transformAllTo2DArray(data);
    if(newData.length === 0) return {
        totalPossibilities: 0,
        possibilityCombination: [],
    };
    const { totalPossibilities } = getPossibility(data);
    const possibilityCombination = findCombinationRecursive(newData);
    return {
        totalPossibilities,
        possibilityCombination,
    };
}
