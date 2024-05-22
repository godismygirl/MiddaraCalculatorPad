import React from 'react';
import { Checkbox, Row, Col } from 'antd';

const WeaponUpgrade = (props) => {
    return (
        <Checkbox.Group {...props} style={{ width: '100%' }}>
            <Row>
                <Col span={8}>
                    <Checkbox value="DEVASTATING">DEVASTATING</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="MASTER_WORK">MASTER WORK</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    );
};

export default WeaponUpgrade;
