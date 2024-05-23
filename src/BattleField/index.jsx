import React from 'react';
import { HeartOutlined, BulbOutlined } from '@ant-design/icons';
import useGlobalStore from '../GlobalStore';
import { ConfigProvider, theme, Checkbox } from 'antd';
import EnemySelect from './EnemySelect';
import AllySelect from './AllySelect';
import css from './css.module.css';

const BattleField = () => {
    const { selectedEnemy, updateEnemyStatus, activeEnemy, setActiveEnemy } =
        useGlobalStore();

    const onStatusChange = (id, status) => {
        updateEnemyStatus({ id, status });
    };

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <div className={css.box}>
                <AllySelect />
                <div className={css.list}>
                    {selectedEnemy?.map((enemy) => (
                        <div
                            key={enemy.id}
                            className={css.item}
                            onClick={() => setActiveEnemy(enemy)}
                        >
                            {activeEnemy?.id === enemy.id && (
                                <i className={css.selectedOutline}></i>
                            )}

                            <div className={css.portait}>
                                <img
                                    alt=""
                                    src={`./portait/${enemy.type}.png`}
                                />
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
                                    <span
                                        className={css.tag + ' ' + css.physic}
                                    >
                                        RESIST PHYSIC
                                    </span>
                                    <span className={css.tag + ' ' + css.magic}>
                                        RESIST MAGIC
                                    </span>
                                    <span
                                        className={css.tag + ' ' + css.ranged}
                                    >
                                        RESIST RANGED
                                    </span>
                                </div>
                                <Checkbox.Group
                                    style={{ width: '100%' }}
                                    onChange={(v) =>
                                        onStatusChange(enemy.id, v)
                                    }
                                >
                                    <div className={css.status}>
                                        <div className={css.block}>
                                            <Checkbox value="WILT">
                                                WILT
                                            </Checkbox>
                                        </div>
                                        <div className={css.block}>
                                            <Checkbox value="NEMESIS">
                                                NEMESIS
                                            </Checkbox>
                                        </div>
                                        <div className={css.block}>
                                            <Checkbox value="HINDERING">
                                                HINDERING
                                            </Checkbox>
                                        </div>
                                    </div>
                                </Checkbox.Group>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={css.footer}>
                    <EnemySelect />
                </div>
            </div>
        </ConfigProvider>
    );
};

export default BattleField;
