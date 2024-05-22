import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import CQCSelect from './CQCSelect';
import css from './css.module.css';

const Discripline = ({ value, onChange }) => {
    return (
        <Checkbox.Group style={{ width: '100%' }}>
            <div className={css.container}>
                <div className={css.block + ' ' + css.martial}>
                    <div className={css.header}>
                        <span className={css.title}>Martial</span>
                    </div>
                    <div className={css.body}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="TRICK_SHOT">
                                    TRICK SHOT
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="PRECISE_STRIKE">
                                    PRECISE STRIKE
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="MASTER_OF_THE_VESSEL">
                                    MASTER OF THE VESSEL
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
                                <Checkbox value="HAMMER_HELM">
                                    HAMMER HELM
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="DEAD_END">DEAD END</Checkbox>
                            </Col>
                            <Col span={8}>
                                <CQCSelect />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Checkbox.Group>
    );
};

export default Discripline;
