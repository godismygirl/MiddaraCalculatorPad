import React, { useState, useEffect } from "react";
import { ConfigProvider, theme, Popover, Space, Button } from "antd";
import Icon from "../../comps/Icon";
import BlackDiceConfig from "../../AllyConfig/BlackDiceConfig";
import css from "./css.module.css";

const DodgeSelect = ({ value, onChange }) => {
  //value只统计shield数量0-4 99=大失败
  //映射黑骰子的base 1:2shield  2：1shield  3：3shield  4：4shield  5：0shield  99：大失败
  const [open, setOpen] = useState(false);
  const [dice, setDice] = useState();

  const onDiceChange = (d) => {
    setDice(d);
  };

  const renderDoge = () => {
    if (value?.base === 99) {
      return <Icon.Skull size={14} color="#3c89e8" />;
    }

    return (
      <>
        <Icon.Shield size={14} color="#3c89e8" />
        <span className={css.text}>+ {value?.shield}</span>
      </>
    );
  };

  const onClear = () => {
    setDice();
  };

  const onConfirm = () => {
    onChange(dice);
    setOpen(false);
  };

  useEffect(() => {
    setDice(value);
  }, [value]);

  return (
    <div className={css.row}>
      <span className={css.label}>Dodge</span>
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Popover
          content={
            <>
              <div className={css.container}>
                <BlackDiceConfig value={dice} onChange={onDiceChange} />
              </div>
              <div className={css.footer}>
                <Space>
                  <Button onClick={onClear}>Clear</Button>
                  <Button type="primary" onClick={onConfirm}>
                    Ok
                  </Button>
                </Space>
              </div>
            </>
          }
          title="Make A Roll"
          trigger="click"
          open={open}
          placement="right"
          onOpenChange={(o) => setOpen(o)}
        >
          <div className={css.button} onClick={() => setOpen(true)}>
            {value ? renderDoge() : "Chose"}
          </div>
        </Popover>
      </ConfigProvider>
    </div>
  );
};

export default DodgeSelect;
