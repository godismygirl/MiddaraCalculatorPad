import React from 'react';
import css from './css.module.css';
import Icon from '../Icon';
import DICE_SET, { PHYSIC_DICE } from './preset';
import BlackDice from './BlackDice';

const Dice = ({ width = 90, color = 'BLUE', value = 10, onChange }) => {
    const isPhysic = PHYSIC_DICE.includes(color);

    return (
        <div
            className={css.dice + ' ' + css[color]}
            style={{
                width: width,
                height: width,
                borderColor: isPhysic ? '#201c1c' : '#fff',
            }}
            onClick={() => onChange?.(DICE_SET[color][value])}
        >
            <i
                className={css.count}
                style={{
                    fontSize: width / 2.4,
                    color: isPhysic ? '#201c1c' : '#fff',
                }}
            >
                {value}
            </i>
            <div className={css.topLeft}>
                {!!DICE_SET?.[color]?.[value]?.burst && (
                    <Icon.Burst
                        size={width / 4}
                        color={isPhysic ? '#201c1c' : '#fff'}
                    />
                )}
            </div>
            <div className={css.topRight}>
                {!!DICE_SET?.[color]?.[value]?.shield && (
                    <Icon.Shield
                        size={width / 4.5}
                        color={isPhysic ? '#201c1c' : '#fff'}
                    />
                )}
            </div>
            <div className={css.bottomLeft}>
                {!!DICE_SET?.[color]?.[value]?.book && (
                    <Icon.Book
                        size={width / 4.5}
                        color={isPhysic ? '#201c1c' : '#fff'}
                    />
                )}
            </div>
            <div className={css.bottomRight}>
                {DICE_SET?.[color]?.[value]?.book === 2 && (
                    <Icon.Book
                        size={width / 4.5}
                        color={isPhysic ? '#201c1c' : '#fff'}
                    />
                )}
                {DICE_SET?.[color]?.[value]?.shield === 2 && (
                    <Icon.Shield
                        size={width / 4.5}
                        color={isPhysic ? '#201c1c' : '#fff'}
                    />
                )}
            </div>
        </div>
    );
};

Dice.Black = BlackDice;

export default Dice;
