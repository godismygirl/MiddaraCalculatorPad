import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import Card from '../comps/Card';
import Icon from '../comps/Icon';
import SymbolAbility from './SymbolAbility';
import DiceConfig from './DiceConfig';
import BlackDiceConfig from './BlackDiceConfig';
import useGlobalStore from '../GlobalStore';
import WeaponUpgrade from './WeaponUpgrade';
import FieldStatus from './FieldStatus';
import Discripline from './Discripline';
import css from './css.module.css';

const AllyConfig = () => {
    const {
        activeAlly,
        allySave,
        updateAllySave,
        calculateDamage,
        damageDealt,
    } = useGlobalStore();
    const [userInput, setUserInput] = useState({}); //收集用户输入的数据
    const [form] = Form.useForm();

    const onSubmit = () => {
        const formData = form.getFieldsValue();
        updateAllySave({
            preset: formData,
            userInput,
        });
        calculateDamage();
    };

    useEffect(() => {
        if (damageDealt) {
            console.log('==== DMG Result ====', damageDealt);
        }
    }, [damageDealt]);

    useEffect(() => {
        if (activeAlly) {
            form.resetFields();
            form.setFieldsValue(allySave?.[activeAlly]?.preset);
            setUserInput(allySave?.[activeAlly]?.userInput);
        }
    }, [activeAlly]);

    return (
        <div className={css.container}>
            <div className={css.header}>ATTACK CONFIG</div>
            {!!activeAlly && (
                <div className={css.body}>
                    <Form form={form} layout="vertical">
                        <Card title="SYMBOL ABILITY">
                            <Form.Item name="symbol_shield" noStyle>
                                <SymbolAbility type="shield" />
                            </Form.Item>
                            <Form.Item name="symbol_book" noStyle>
                                <SymbolAbility type="book" />
                            </Form.Item>
                            <Form.Item name="symbol_burst" noStyle>
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
                                <FieldStatus
                                    userInput={userInput}
                                    onUserInput={(u) =>
                                        setUserInput({ ...userInput, ...u })
                                    }
                                />
                            </Form.Item>
                        </Card>

                        <Card title="DISCRIPLINE">
                            <Form.Item name="discripline" noStyle>
                                <Discripline
                                    userInput={userInput}
                                    onUserInput={(u) =>
                                        setUserInput({ ...userInput, ...u })
                                    }
                                />
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
                                <BlackDiceConfig toggler />
                            </Form.Item>
                        </Card>
                    </Form>
                    <div className={css.footer}>
                        <button className={css.button} onClick={onSubmit}>
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
