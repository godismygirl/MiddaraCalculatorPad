import React, { useState } from 'react';
import useGlobalStore from '../GlobalStore';
import { FLAT_ENEMY_COLLECTION } from '../GlobalStore';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Icon from '../comps/Icon';
import css from './css.module.css';

const FoeSelect = () => {
    const { removeEnemyByType, addEnemy, selectedEnemy } = useGlobalStore();
    const [open, setOpen] = useState(false);

    const getFoeCount = (enemyType) => {
        const pool = selectedEnemy.filter((foe) => foe.type === enemyType);
        return pool?.length;
    };

    return (
        <>
            <button className={css.button} onClick={() => setOpen(true)}>
                <Icon.Status color="#666" size={14} />
                <span className={css.text}>ENCOUNTER ENEMY</span>
                <Icon.Status color="#666" size={14} />
            </button>
            {open && (
                <div className={css.container}>
                    {FLAT_ENEMY_COLLECTION?.map((el) => {
                        const count = getFoeCount(el.type);
                        return (
                            <div key={el.type} className={css.block}>
                                <div className={css.imgBox}>
                                    <img
                                        alt=""
                                        src={`./portait/${el.type}.png`}
                                    />
                                </div>
                                <div className={css.action}>
                                    <i
                                        className={
                                            count > 0
                                                ? css.btn
                                                : css.disabledBtn
                                        }
                                        onClick={() =>
                                            removeEnemyByType(el.type)
                                        }
                                    >
                                        <MinusOutlined />
                                    </i>
                                    <div
                                        className={css.count}
                                        style={{
                                            color: count > 0 ? '#f50' : '#555',
                                        }}
                                    >
                                        {count}
                                    </div>
                                    <i
                                        className={css.btn}
                                        onClick={() => addEnemy(el)}
                                    >
                                        <PlusOutlined />
                                    </i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            {open && (
                <div className={css.mask} onClick={() => setOpen(false)}></div>
            )}
        </>
    );
};

export default FoeSelect;
