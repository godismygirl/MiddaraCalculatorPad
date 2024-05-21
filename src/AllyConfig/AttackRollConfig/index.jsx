import React from 'react';
import { Checkbox } from 'antd';

const options = [
    { value: 'DARKNESS', label: 'DARKNESS' },
    { value: 'HINDERING', label: 'HINDERING' },
    { value: 'CROSS_ALLY', label: 'CROSS ALLY' },
    { value: 'FLANKING', label: 'FLANKING' },
    { value: 'MASTER_WORK', label: 'MASTER WORK' },
];

//夹击

const AttackRollConfig = () => {
    return <Checkbox.Group options={options}></Checkbox.Group>;
};

export default AttackRollConfig;
