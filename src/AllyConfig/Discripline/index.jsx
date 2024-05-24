import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import CQCSelect from './CQCSelect';
import css from './css.module.css';

//数据格式 [${name}, ${name}=${dmg}]

const Discripline = ({ value, onChange, userInput, onUserInput }) => {
    return (
        <Checkbox.Group
            value={value}
            style={{ width: '100%' }}
            onChange={onChange}
        >
            <div className={css.container}>
                <div className={css.block + ' ' + css.martial}>
                    <div className={css.header}>
                        <span className={css.title}>Martial</span>
                    </div>
                    <div className={css.body}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="HAMMER_HELM">
                                    Hammer Helm
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="DEAD_END">Dead End</Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="MASTER_OF_THE_VESSEL">
                                    Master Of The Vessel
                                </Checkbox>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className={css.block + ' ' + css.subterfuge}>
                    <div className={css.header}>
                        <span className={css.title}>Subterfuge</span>
                    </div>
                    <div className={css.body}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="TRICK_SHOT">
                                    Trick Shot
                                </Checkbox>
                            </Col>

                            <Col span={8}>
                                <Checkbox value="PRECISE_STRIKE">
                                    Precise Strike
                                </Checkbox>
                            </Col>

                            <Col span={8}>
                                <CQCSelect
                                    value="CQC"
                                    number={userInput?.['CQC']}
                                    onNumberChange={(d) =>
                                        onUserInput({ CQC: d })
                                    }
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Checkbox.Group>
    );
};

export default Discripline;
