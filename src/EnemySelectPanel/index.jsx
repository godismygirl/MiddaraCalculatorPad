import React, { useState } from 'react';
import { useStore } from 'reto';
import GlobalStore from '../GlobalStore';
import { FLAT_ENEMY_COLLECTION } from '../GlobalStore';
import {
    MinusCircleFilled,
    PlusCircleFilled,
    MinusOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import css from './css.module.css';

const FoeSelectPanel = () => {
    const store = useStore(GlobalStore);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={css.container} style={{ top: open ? 0 : '-35vh' }}>
                <div className={css.toggler} onClick={() => setOpen(!open)}>
                    Select Enemy
                </div>
                <div className={css.panel}>
                    {FLAT_ENEMY_COLLECTION?.map((el) => {
                        const count = store.getEnemyCount(el.type);
                        return (
                            <div key={el.type} className={css.block}>
                                <img src={`./portait/${el.type}.png`} />
                                <div className={css.action}>
                                    <i
                                        className={
                                            count > 0
                                                ? css.btn
                                                : css.disabledBtn
                                        }
                                        onClick={() =>
                                            store.removeEnemyByType(el.type)
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
                                        onClick={() => store.addEnemy(el)}
                                    >
                                        <PlusOutlined />
                                    </i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {open && (
                <div className={css.mask} onClick={() => setOpen(false)}></div>
            )}
        </>
    );
};

export default FoeSelectPanel;
