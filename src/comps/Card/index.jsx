import React, { useState } from 'react';
import Icon from '../Icon';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import css from './css.module.css';

const Card = ({ title, children }) => {
    const [folded, setFolded] = useState(false);

    return (
        <div className={css.card}>
            <div className={css.header} onClick={() => setFolded(!folded)}>
                <div className={css.title}>
                    <Icon.Status color="#fff" size={12} />
                    <span>{title}</span>
                </div>
                <div className={css.placeholder}></div>
                <i className={css.toggler}>
                    {folded ? (
                        <PlusOutlined style={{ fontSize: 14 }} />
                    ) : (
                        <MinusOutlined style={{ fontSize: 14 }} />
                    )}
                </i>
            </div>
            <div className={folded ? css.foldBody : css.body}>{children}</div>
        </div>
    );
};

export default Card;
