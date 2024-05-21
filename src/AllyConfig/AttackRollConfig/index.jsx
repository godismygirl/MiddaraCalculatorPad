import React from 'react';
import { Checkbox } from 'antd';
import { AC_MODIFIER } from '../../GlobalStore';
import css from './css.module.css';

const options = ['DARKNESS', 'HINDERING', 'CROSS_ALLY', 'FLANKING'];

//夹击

const AttackRollConfig = () => {
    const options = React.useMemo(() => {
        return AC_MODIFIER.map((el) => ({ label: el.name, value: el.name }));
    }, []);
    return <Checkbox.Group options={options}></Checkbox.Group>;
};

export default AttackRollConfig;
