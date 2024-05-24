import React, { useEffect, useState } from 'react';
import { Checkbox, Radio } from 'antd';
import css from './css.module.css';

//value 0 1 2 3 4

const CQCSelect = ({ number, onNumberChange, value }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (number) {
            setChecked(true);
        }
    }, [number]);

    return (
        <div className={css.box}>
            <Checkbox
                style={{ marginRight: 5 }}
                value={value}
                onChange={(e) => {
                    setChecked(e.target.checked);
                    if (!e.target.checked) {
                        onNumberChange(0);
                    }
                }}
            >
                Vow
            </Checkbox>
            {checked && (
                <div className={css.number}>
                    <Radio.Group
                        value={number}
                        size="small"
                        optionType="button"
                        buttonStyle="solid"
                        options={[1, 2, 3, 4, 5]}
                        onChange={(e) => {
                            onNumberChange?.(e.target.value);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CQCSelect;
