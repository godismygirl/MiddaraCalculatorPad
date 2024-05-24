import React from "react";
import css from "./css.module.css";
import Icon from "../Icon";

const PRESET = {
  2: {
    shield: 2,
    book: 2,
    burst: 0,
  },
  1: {
    shield: 1,
    book: 3,
    burst: 0,
  },
  3: {
    shield: 3,
    book: 1,
    burst: 0,
  },
  4: {
    shield: 4,
    book: 0,
    burst: 0,
  },
  0: {
    shield: 0,
    book: 4,
    burst: 0,
  },
  99: {
    shield: 0,
    book: 0,
    burst: 0,
  },
};

//以盾的数量作为base key 大失败为99

const BlackDice = ({ width = 90, value = 99, onChange }) => {
  return (
    <div
      className={css.dice}
      style={{
        width: width,
        height: width,
        background: "#201c1c",
        borderColor: "#201c1c",
      }}
      onClick={() => onChange?.(PRESET[value])}
    >
      {value === 99 && (
        <div className={css.skull}>
          <Icon.Skull size={width / 1.5} color="#fff" />
        </div>
      )}

      <div className={css.topLeft}>
        {[2, 3, 4].includes(value) && (
          <Icon.Shield size={width / 3.2} color="#fff" />
        )}
        {[1, 0].includes(value) && (
          <Icon.Book size={width / 3.2} color="#fff" />
        )}
      </div>
      <div className={css.topRight}>
        {[2, 1, 3, 4].includes(value) && (
          <Icon.Shield size={width / 3.2} color="#fff" />
        )}
        {value === 0 && <Icon.Book size={width / 3.2} color="#fff" />}
      </div>
      <div className={css.bottomLeft}>
        {value === 4 && <Icon.Shield size={width / 3.2} color="#fff" />}
        {[2, 1, 3, 0].includes(value) && (
          <Icon.Book size={width / 3.2} color="#fff" />
        )}
      </div>
      <div className={css.bottomRight}>
        {[2, 1, 0].includes(value) && (
          <Icon.Book size={width / 3.2} color="#fff" />
        )}
        {[3, 4].includes(value) && (
          <Icon.Shield size={width / 3.2} color="#fff" />
        )}
      </div>
    </div>
  );
};

export default BlackDice;
