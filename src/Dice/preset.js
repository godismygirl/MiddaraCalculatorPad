const increase = (set) => {
    let after = {};
    Object.keys(set)?.forEach((key) => {
        after[key + 1] = set[key];
    });
    return after;
};

export const PHYSIC_DICE = ['BLUE', 'FIRE', 'YELLOW', 'PINK'];
export const MAGIC_DICE = ['GREY', 'SKY', 'BROWN', 'HUNTER'];

let DICE_SET = {
    BLUE: {
        5: {
            shield: 0,
            book: 0,
            burst: 0,
        },
        6: {
            shield: 0,
            book: 0,
            burst: 0,
        },
        7: {
            shield: 1,
            book: 0,
            burst: 0,
        },
        8: {
            shield: 1,
            book: 1,
            burst: 0,
        },
        9: {
            shield: 2,
            book: 1,
            burst: 0,
        },
        10: {
            shield: 2,
            book: 1,
            burst: 1,
        },
    },
    GREY: {
        4: {
            shield: 0,
            book: 0,
            burst: 0,
        },
        5: {
            shield: 0,
            book: 0,
            burst: 0,
        },
        6: {
            shield: 0,
            book: 1,
            burst: 0,
        },
        8: {
            shield: 1,
            book: 1,
            burst: 0,
        },
        9: {
            shield: 1,
            book: 2,
            burst: 0,
        },
        10: {
            shield: 1,
            book: 2,
            burst: 0,
        },
    },
};

DICE_SET.FIRE = increase(DICE_SET.BLUE);
DICE_SET.YELLOW = increase(DICE_SET.FIRE);
DICE_SET.PINK = increase(DICE_SET.YELLOW);

DICE_SET.SKY = increase(DICE_SET.GREY);
DICE_SET.BROWN = increase(DICE_SET.SKY);
DICE_SET.HUNTER = increase(DICE_SET.BROWN);

export default DICE_SET;
