import React from "react";
import { Checkbox, Row, Col } from "antd";

const FieldStatus = (props) => {
  return (
    <Checkbox.Group {...props} style={{ width: "100%" }}>
      <Row>
        <Col span={6}>
          <Checkbox value="COURAGE">COURAGE</Checkbox>
        </Col>
        <Col span={6}>
          <Checkbox value="DARKNESS">DARKNESS</Checkbox>
        </Col>
        <Col span={6}>
          <Checkbox value="CROSS_ALLY">CROSS ALLY</Checkbox>
        </Col>
        <Col span={6}>
          <Checkbox value="FLANKING">FLANKING</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
};

export default FieldStatus;