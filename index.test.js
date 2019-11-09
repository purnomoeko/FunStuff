const assert = require('assert');
const _ = require('lodash');
const { findCombination } = require('./index');

describe('Get possibility of video permutation', () => {
    it('get video permutation ArrayLength = 0', () => {
        const result = findCombination([]);
        assert.equal(result.totalPossibilities, 0);
        assert.equal(result.possibilityCombination.length, 0);
    });

    it('get video permutation Segment = 5, videoBlock = 3 ', () => {
        const result = findCombination(['A', ['B', 'C', 'D'], 'E']);
        assert.equal(result.totalPossibilities, 3);
        assert.equal(result.possibilityCombination.length, 3);
        
    });
    it('get video permutation Segment = 10, videoBlock = 6 ', () => {
        const params = ['A', ['B', 'C', 'D'], 'E', ['F', 'G'], 'H', ['I', 'J']];
        const result = findCombination(params);
        assert.equal(result.totalPossibilities, 12);
        assert.equal(result.possibilityCombination.length, 12);
        console.info('Params: ', params);
        console.info('Result: ', result);
    });

    it('get video permutation random segment > 10, random video block > 10', () => {
        const randomSegment = (Math.random() * 100).toFixed(0);

        const parameter = _.times(randomSegment, (index) => {
            let blockLength = (Math.random() * 10).toFixed(0);
            blockLength = blockLength === 0 ? 1 : blockLength;
            const array = _.times(blockLength, (iBlock) => {
                const str = String.fromCharCode(Math.floor(65 + (Math.random() * 40)));
                return str;
            })
            return array;
        });
        const result = findCombination(parameter);
        let possiblity = 0;
        parameter.filter(o => o.length > 1).forEach(o => {
            possiblity *= o.length;
        });
        assert.equal(result.totalPossibilities, possiblity);
        assert.equal(result.possibilityCombination.length, possiblity);
    });
});