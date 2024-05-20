import React, { useState, useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { DICE_COLOR_SET } from "../../GlobalStore";
import Dice from "../../Dice";
import css from "./css.module.css";

//数据格式 {color:'BLUE', count:9, shield:1, book:1, burst:0}

const DiceConfig = ({ value, onChange }) => {
  const [color, setColor] = useState();

  const renderColorSet = () => {
    let result = [];
    Object.keys(DICE_COLOR_SET).forEach((c) => {
      const active = color === c;
      result.push(
        <div
          key={c}
          className={css.box}
          style={{ borderColor: active ? "#1677ff" : "transparent" }}
        >
          <i
            key={c}
            className={`${css[c]} ${css.icon}`}
            onClick={() => {
              setColor(c);
              onChange?.();
            }}
          ></i>
          {active && <CheckOutlined className={css.active} />}
        </div>
      );
    });
    return result;
  };

  useEffect(() => {
    if (value) {
      setColor(value.color);
    }
  }, [value]);

  return (
    <div className={css.container}>
      <div className={css.color}>{renderColorSet(true)}</div>
      <div className={css.dice}>
        {DICE_COLOR_SET?.[color]?.map((v) => {
          const active = value?.base === v;

          return (
            <div
              className={css.box}
              style={{ borderColor: active ? "#1677ff" : "transparent" }}
            >
              <Dice
                key={v}
                width={50}
                color={color}
                value={v}
                onChange={(c) => {
                  c.color = color;
                  c.base = v;
                  onChange?.(c);
                }}
              />
              {active && <CheckOutlined className={css.activeDice} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiceConfig;
