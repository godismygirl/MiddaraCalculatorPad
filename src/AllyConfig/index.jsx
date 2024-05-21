import React from 'react';
import { Form } from 'antd';
import WeaponConfig from './WeaponConfig';
import DiceConfig from './DiceConfig';
import BlackDiceConfig from './BlackDiceConfig';
import useGlobalStore, { ALLY_COLLECTION } from '../GlobalStore';
import AttackRollConfig from './AttackRollConfig';
import Icon from '../Icon';
import css from './css.module.css';

const AllyConfig = () => {
    const { activeAlly, setActiveAlly } = useGlobalStore();
    const [form] = Form.useForm();

    return (
        <div className={css.container}>
            <div className={css.roles}>
                {ALLY_COLLECTION?.map((ally) => (
                    <div
                        className={css.avatar}
                        onClick={() => setActiveAlly(ally)}
                    >
                        <img
                            alt=""
                            className={
                                activeAlly === ally ? css.activeFace : css.face
                            }
                            src={`./adventurer/${ally}.png`}
                        />
                    </div>
                ))}
            </div>
            {!!activeAlly && (
                <div className={css.body}>
                    <Form form={form} layout="vertical">
                        <div className={css.sectionHeader}>
                            <div className={css.titleTag}>
                                <Icon.Status color="#fff" size={12} />
                                <span>WEAPON SET</span>
                            </div>
                        </div>
                        <div className={css.sectionBody}>
                            <Form.Item name="shield" noStyle>
                                <WeaponConfig type="shield" />
                            </Form.Item>
                            <Form.Item name="book" noStyle>
                                <WeaponConfig type="book" />
                            </Form.Item>
                            <Form.Item name="burst" noStyle>
                                <WeaponConfig type="burst" />
                            </Form.Item>
                        </div>
                        <AttackRollConfig />
                        <div className={css.section}>
                            <div className={css.sectionHeader}>
                                <div className={css.titleTag}>
                                    <Icon.Status color="#fff" size={12} />
                                    <span>DICE SET A</span>
                                </div>
                            </div>
                            <div className={css.sectionBody}>
                                <Form.Item name="diceA" noStyle>
                                    <DiceConfig />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={css.section}>
                            <div className={css.sectionHeader}>
                                <div className={css.titleTag}>
                                    <Icon.Status color="#fff" size={12} />
                                    <span>DICE SET B</span>
                                </div>
                            </div>
                            <div className={css.sectionBody}>
                                <Form.Item name="diceB" noStyle>
                                    <DiceConfig />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={css.section}>
                            <div className={css.sectionHeader}>
                                <div className={css.titleTag}>
                                    <Icon.Status color="#fff" size={12} />
                                    <span>DICE DICE SET</span>
                                </div>
                            </div>
                            <div className={css.sectionBody}>
                                <Form.Item name="blackDice" noStyle>
                                    <BlackDiceConfig />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default AllyConfig;
