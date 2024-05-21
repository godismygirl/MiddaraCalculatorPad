import React from 'react';
import { Checkbox } from 'antd';

const options = ['DARKNESS', 'HINDERING', 'CROSS_ALLY'];

//夹击

const AttackRollConfig = () => {
    return <Checkbox.Group options={options}></Checkbox.Group>;
};

export default AttackRollConfig;
