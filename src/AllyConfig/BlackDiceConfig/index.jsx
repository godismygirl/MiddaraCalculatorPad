import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Dice from '../../comps/Dice';
import css from './css.module.css';

//黑骰子默认1-6

const BlackDiceConfig = ({ value, onChange, toggler }) => {
    const [empower, setEmpower] = useState(!toggler);

    const renderDice = () => {
        let result = [];
        for (let i = 1; i <= 6; i++) {
            const active = value?.base === i;
            result.push(
                <div
                    key={i}
                    className={css.box}
                    style={{
                        borderColor: active ? '#1677ff' : 'transparent',
                    }}
                >
                    <Dice.Black
                        value={i}
                        width={50}
                        onChange={(c) => {
                            c.color = 'BLACK';
                            c.base = i;
                            onChange?.(c);
                        }}
                    />
                    <div className={css.checkPlace}>
                        {active && (
                            <CheckOutlined
                                className={css.active}
                                style={{ marginTop: 5 }}
                            />
                        )}
                    </div>
                </div>
            );
        }
        return result;
    };

    useEffect(() => {
        if (value) {
            setEmpower(true);
        }
    }, [value]);

    return (
        <div className={css.container}>
            {toggler && (
                <div className={css.header}>
                    <span
                        className={css.label}
                        style={{ color: empower ? '#1677ff' : '#999' }}
                    >
                        EMPOWER
                    </span>
                    <Switch
                        checked={empower}
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                        onChange={(checked) => {
                            setEmpower(checked);
                            if (!checked) onChange?.();
                        }}
                    />
                </div>
            )}
            {empower && <div className={css.body}>{renderDice()}</div>}
        </div>
    );
};

export default BlackDiceConfig;
