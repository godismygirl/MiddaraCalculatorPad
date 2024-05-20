import React from "react";

import { Form } from "antd";
import WeaponConfig from "./WeaponConfig";
import DiceConfig from "./DiceConfig";
import css from "./css.module.css";

const AllyConfig = () => {
  const [form] = Form.useForm();

  return (
    <div className={css.container}>
      <div className={css.roles}>
        <div className={css.remi}>
          <img src={`./adventurer/remi.png`} />
        </div>
        <div className={css.nightingale}>
          <img src={`./adventurer/nightingale.png`} />
        </div>
        <div className={css.rook}>
          <img src={`./adventurer/rook.png`} />
        </div>
        <div className={css.zeke}>
          <img src={`./adventurer/zeke.png`} />
        </div>
      </div>
      <div className={css.body}>
        <Form form={form} layout="vertical">
          <Form.Item name="shield" noStyle>
            <WeaponConfig type="shield" />
          </Form.Item>
          <Form.Item name="book" noStyle>
            <WeaponConfig type="book" />
          </Form.Item>
          <Form.Item name="burst" noStyle>
            <WeaponConfig type="burst" />
          </Form.Item>
          <Form.Item name="diceA" noStyle>
            <DiceConfig />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AllyConfig;
