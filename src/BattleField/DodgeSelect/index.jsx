import React, { useState } from "react";
import { ConfigProvider, theme, Popover } from "antd";
import BlackDiceConfig from "../../AllyConfig/BlackDiceConfig";
import css from "./css.module.css";

const DodgeSelect = ({ value, onChange }) => {
  //value只统计shield数量0-4 99=大失败
  //映射黑骰子的base 1:2shield  2：1shield  3：3shield  4：4shield  5：0shield  99：大失败
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Popover
        content={
          <div className={css.container}>
            <BlackDiceConfig value={value} onChange={onChange} />
          </div>
        }
        title="Make A Roll"
        trigger="click"
        open={open}
        placement="right"
        onOpenChange={(o) => setOpen(o)}
      >
        <div className={css.button} onClick={() => setOpen(true)}>
          Dodge<i className={css.number}>{value?.shield}</i>
        </div>
      </Popover>
    </ConfigProvider>
  );
};

export default DodgeSelect;
