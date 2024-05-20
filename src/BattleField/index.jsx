import React from 'react';
import { HeartOutlined, BulbOutlined } from '@ant-design/icons';
import { useStore } from 'reto';
import GlobalStore from '../GlobalStore';
import { ConfigProvider, theme, Checkbox } from 'antd';
import css from './css.module.css';

const BattleField = () => {
    const { selectedEnemy, updateEnemyStatus, activeEnemy, setActiveEnemy } =
        useStore(GlobalStore);

    const onStatusChange = (id, status) => {
        updateEnemyStatus({ id, status });
    };

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <div className={css.list}>
                {selectedEnemy?.map((enemy) => (
                    <div
                        className={css.item}
                        onClick={() => setActiveEnemy(enemy)}
                    >
                        {activeEnemy?.id === enemy.id && (
                            <i className={css.selectedOutline}></i>
                        )}

                        <div className={css.portait}>
                            <img src={`./portait/${enemy.type}.png`} />
                        </div>
                        <div className={css.content}>
                            <div className={css.row}>
                                <i>
                                    <HeartOutlined />
                                </i>
                                <div className={css.text}>
                                    HP REMAIN
                                    <span className={css.strong}>40</span>
                                </div>
                            </div>
                            <div className={css.row}>
                                <i>
                                    <BulbOutlined />
                                </i>
                                <div className={css.text}>
                                    LAST DMG DEALT
                                    <span className={css.strong}>40</span>
                                </div>
                            </div>
                            <div className={css.resist}>
                                <span className={css.tag + ' ' + css.physic}>
                                    RESISTANCE PHYSIC
                                </span>
                                <span className={css.tag + ' ' + css.magic}>
                                    RESISTANCE MAGIC
                                </span>
                                <span className={css.tag + ' ' + css.ranged}>
                                    RESISTANCE RANGED
                                </span>
                            </div>
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                onChange={(v) => onStatusChange(enemy.id, v)}
                            >
                                <div className={css.status}>
                                    <div className={css.block}>
                                        <Checkbox value="WILT">WILT</Checkbox>
                                    </div>
                                    <div className={css.block}>
                                        <Checkbox value="NEMESIS">
                                            NEMESIS
                                        </Checkbox>
                                    </div>
                                </div>
                            </Checkbox.Group>
                        </div>
                    </div>
                ))}
            </div>
        </ConfigProvider>
    );
};

export default BattleField;
