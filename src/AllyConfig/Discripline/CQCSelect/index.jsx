import React from 'react';
import { Checkbox, Radio } from 'antd';
import css from './css.module.css';

//value 0 1 2 3 4

const CQCSelect = ({ value, onChange }) => {
    return (
        <div className={css.box}>
            <Checkbox
                checked={!!value}
                onChange={(c) => onChange?.(c ? 1 : 0)}
                style={{ marginRight: 5 }}
            >
                C.Q.C
            </Checkbox>
            {value > 0 && (
                <Radio.Group
                    size="small"
                    optionType="button"
                    buttonStyle="solid"
                    options={[1, 2, 3, 4]}
                    onChange={(v) => onChange?.(v)}
                />
            )}
        </div>
    );
};

export default CQCSelect;
