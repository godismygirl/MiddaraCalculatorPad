import React from 'react';
import Icon from '../../Icon';
import { WEAPON_CONFIG } from '../../GlobalStore';
import css from './css.module.css';

const NAMES_MAP = {
    shield: 'Shield',
    book: 'Book',
    burst: 'Burst',
};

const WeaponConfig = ({ value, onChange, type = 'shield' }) => {
    const WeaponTag = Icon[NAMES_MAP[type]];
    console.log('WeaponTag', NAMES_MAP[type]);
    const renderIcon = (count, active) => {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(
                <WeaponTag
                    key={i}
                    color={active ? '#1677ff' : '#666'}
                    size={14}
                    style={{ marginRight: 2 }}
                />
            );
        }
        return result;
    };

    return (
        <div className={css.box}>
            {WEAPON_CONFIG[type]?.map((el, i) => {
                const isActive =
                    value?.[type] === el[type] &&
                    value?.dmg === el.dmg &&
                    value?.type === el.type;
                return (
                    <div
                        key={i}
                        className={isActive ? css.activeItem : css.item}
                        onClick={() => onChange?.(el)}
                    >
                        <div className={css.icon}>
                            {renderIcon(el[type], isActive)}
                        </div>
                        <div className={css.desc}>
                            +{el.dmg} {el.type} DMG
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeaponConfig;
