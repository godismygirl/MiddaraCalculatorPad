import React from 'react';
import Icon from '../../Icon';
import { WEAPON_CONFIG } from '../../GlobalStore';
import css from './css.module.css';

const WeaponConfig = ({ value, onChange }) => {
    const renderIcon = (count) => {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(<Icon.Shield size={14} style={{ marginRight: 2 }} />);
        }
        return result;
    };

    return (
        <div className={css.box}>
            {WEAPON_CONFIG.shield?.map((el) => (
                <div
                    className={
                        value?.Shield === el.shield && value.dmg === el.dmg
                            ? css.activeItem
                            : css.item
                    }
                    onClick={() => onChange?.(el)}
                >
                    <div className={css.icon}>{renderIcon(el.shield)}</div>
                    <div className={css.desc}>+{el.dmg} PHYSICAL DMG</div>
                </div>
            ))}
        </div>
    );
};

export default WeaponConfig;
