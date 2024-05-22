import React from 'react';
import { Form } from 'antd';
import Card from '../comps/Card';
import Icon from '../comps/Icon';
import SymbolAbility from './SymbolAbility';
import DiceConfig from './DiceConfig';
import BlackDiceConfig from './BlackDiceConfig';
import useGlobalStore, { ALLY_COLLECTION } from '../GlobalStore';
import WeaponUpgrade from './WeaponUpgrade';
import FieldStatus from './FieldStatus';
import Discripline from './Discripline';
import css from './css.module.css';

const AllyConfig = () => {
    const { activeAlly, setActiveAlly } = useGlobalStore();
    //const [em]
    const [form] = Form.useForm();

    return (
        <div className={css.container}>
            {/* <div className={css.roles}>
                {ALLY_COLLECTION?.map((ally) => (
                    <div
                        key={ally}
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
            </div> */}
            {!!activeAlly && (
                <div className={css.body}>
                    <Form form={form} layout="vertical">
                        <Card title="SYMBOL ABILITY">
                            <Form.Item name="shield" noStyle>
                                <SymbolAbility type="shield" />
                            </Form.Item>
                            <Form.Item name="book" noStyle>
                                <SymbolAbility type="book" />
                            </Form.Item>
                            <Form.Item name="burst" noStyle>
                                <SymbolAbility type="burst" />
                            </Form.Item>
                        </Card>

                        <Card title="WEAPON UPGRADE">
                            <Form.Item name="weapon_upgrade" noStyle>
                                <WeaponUpgrade />
                            </Form.Item>
                        </Card>

                        <Card title="FIELD STATUS">
                            <Form.Item name="field_status" noStyle>
                                <FieldStatus />
                            </Form.Item>
                        </Card>

                        <Card title="DISCRIPLINE">
                            <Form.Item name="discripline" noStyle>
                                <Discripline />
                            </Form.Item>
                        </Card>

                        <Card title="DICE SET A">
                            <Form.Item name="diceA" noStyle>
                                <DiceConfig />
                            </Form.Item>
                        </Card>

                        <Card title="DICE SET B">
                            <Form.Item name="diceB" noStyle>
                                <DiceConfig />
                            </Form.Item>
                        </Card>

                        <Card title="EMPOWER SET">
                            <Form.Item name="empower" noStyle>
                                <BlackDiceConfig />
                            </Form.Item>
                        </Card>
                    </Form>
                    <div className={css.footer}>
                        <button className={css.button}>
                            <Icon.Status color="#fff" size={14} />
                            <span className={css.text}>CALCULATE</span>
                            <Icon.Status color="#fff" size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllyConfig;
