import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { BLACK_DICE_SET } from "../../GlobalStore";
import Dice from "../../comps/Dice";
import css from "./css.module.css";

const BlackDiceConfig = ({ value, onChange, toggler }) => {
  const [empower, setEmpower] = useState(!toggler);

  useEffect(() => {
    if (value) {
      setEmpower(true);
    }
  }, [value]);

  return (
    <div className={css.container}>
      {toggler && (
        <div className={css.header}>
          <span
            className={css.label}
            style={{ color: empower ? "#1677ff" : "#999" }}
          >
            EMPOWER
          </span>
          <Switch
            checked={empower}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            onChange={(checked) => {
              setEmpower(checked);
              if (!checked) onChange?.();
            }}
          />
        </div>
      )}
      {empower && (
        <div className={css.body}>
          {BLACK_DICE_SET?.map((base) => (
            <div
              key={base}
              className={css.box}
              style={{
                borderColor: value?.base === base ? "#1677ff" : "transparent",
              }}
            >
              <Dice.Black
                value={base}
                width={50}
                onChange={(c) => {
                  c.color = "BLACK";
                  c.base = base;
                  onChange?.(c);
                }}
              />
              <div className={css.checkPlace}>
                {value?.base === base && (
                  <CheckOutlined
                    className={css.active}
                    style={{ marginTop: 5 }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlackDiceConfig;
