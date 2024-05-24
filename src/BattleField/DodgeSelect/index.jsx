import React, { useState } from 'react';
import { Modal } from 'antd';
import BlackDiceConfig from '../../AllyConfig/BlackDiceConfig';
import css from './css.module.css';

const DodgeSelect = ({ value, onChange }) => {
    //value只统计shield数量0-4 5=大失败
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={css.button} onClick={() => setOpen(true)}>
                Dodge<i className={css.number}>{value}</i>
            </div>
            <Modal
                open={open}
                title="Dodge"
                footer={null}
                onCancel={() => setOpen(false)}
            >
                <div className={css.container}>
                    <BlackDiceConfig />
                </div>
            </Modal>
        </>
    );
};

export default DodgeSelect;
