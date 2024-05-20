import React from 'react';
import WeaponSheild from './WeaponShield';
import css from './css.module.css';

const AllyConfig = () => {
    return (
        <div className={css.container}>
            <div className={css.roles}>
                <div className={css.remi}>
                    <img src={`./adventurer/remi.png`} />
                </div>
                <div className={css.nightingale}>
                    <img src={`./adventurer/nightingale.png`} />
                </div>
                <div className={css.rook}>
                    <img src={`./adventurer/rook.png`} />
                </div>
                <div className={css.zeke}>
                    <img src={`./adventurer/zeke.png`} />
                </div>
            </div>
            <div className={css.body}>
                <WeaponSheild />
            </div>
        </div>
    );
};

export default AllyConfig;
