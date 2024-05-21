import React, { useState } from 'react';
import { Switch } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Dice from '../../Dice';
import css from './css.module.css';

//黑骰子默认1-6

const BlackDiceConfig = ({ value, onChange }) => {
    const [empower, setEmpower] = useState(false);

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
                    {active && (
                        <CheckOutlined
                            className={css.active}
                            style={{ marginTop: 5 }}
                        />
                    )}
                </div>
            );
        }
        return result;
    };

    return (
        <div className={css.container}>
            <Switch
                checked={empower}
                checkedChildren="ON"
                unCheckedChildren="OFF"
                onChange={(checked) => {
                    setEmpower(checked);
                    onChange?.();
                }}
            />
            {empower && <div className={css.body}>{renderDice()}</div>}
        </div>
    );
};

export default BlackDiceConfig;
