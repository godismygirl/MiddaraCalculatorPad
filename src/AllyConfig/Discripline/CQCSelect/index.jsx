import React, { useEffect, useState } from 'react';
import { Checkbox, Radio } from 'antd';
import css from './css.module.css';

//value 0 1 2 3 4

const CQCSelect = ({ dmg, onDmgChange, value }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (dmg) {
            setChecked(true);
        }
    }, [dmg]);

    return (
        <div className={css.box}>
            <Checkbox
                style={{ marginRight: 5 }}
                value={value}
                onChange={(e) => setChecked(e.target.checked)}
            >
                C.Q.C
            </Checkbox>
            {checked && (
                <div className={css.number}>
                    <Radio.Group
                        value={dmg}
                        size="small"
                        optionType="button"
                        buttonStyle="solid"
                        options={[1, 2, 3, 4]}
                        onChange={(e) => {
                            onDmgChange?.(e.target.value);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CQCSelect;
