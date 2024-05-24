import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import VowSelect from './VowSelect';

const FieldStatus = ({ value, onChange, userInput, onUserInput }) => {
    return (
        <Checkbox.Group
            value={value}
            onChange={onChange}
            style={{ width: '100%' }}
        >
            <Row gutter={[0, 10]}>
                <Col span={8}>
                    <Checkbox value="DARKNESS">Darkness</Checkbox>
                </Col>
                <Col span={16}>
                    <Checkbox value="CROSS_ALLY">Cross Ally</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="COURAGE">Courage</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="FLANKING">Flanking</Checkbox>
                </Col>
                <Col span={8}>
                    <VowSelect
                        value="VOW"
                        number={userInput?.['VOW']}
                        onNumberChange={(d) => onUserInput({ VOW: d })}
                    />
                </Col>
            </Row>
        </Checkbox.Group>
    );
};

export default FieldStatus;
