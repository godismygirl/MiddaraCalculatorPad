import React from "react";
import css from "./css.module.css";
import Icon from "../Icon";

const PRESET = {
  1: {
    shield: 2,
    book: 2,
    burst: 0,
  },
  2: {
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
  5: {
    shield: 0,
    book: 4,
    burst: 0,
  },
  6: {
    shield: 0,
    book: 0,
    burst: 0,
  },
};

const BlackDice = ({ width = 90, value = 6, onChange }) => {
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
      {value === 6 && (
        <div className={css.skull}>
          <Icon.Skull size={width / 1.5} color="#fff" />
        </div>
      )}

      <div className={css.topLeft}>
        {[1, 3, 4].includes(value) && (
          <Icon.Shield size={width / 3.2} color="#fff" />
        )}
        {[2, 5].includes(value) && (
          <Icon.Book size={width / 3.2} color="#fff" />
        )}
      </div>
      <div className={css.topRight}>
        {[1, 2, 3, 4].includes(value) && (
          <Icon.Shield size={width / 3.2} color="#fff" />
        )}
        {value === 5 && <Icon.Book size={width / 3.2} color="#fff" />}
      </div>
      <div className={css.bottomLeft}>
        {value === 4 && <Icon.Shield size={width / 3.2} color="#fff" />}
        {[1, 2, 3, 5].includes(value) && (
          <Icon.Book size={width / 3.2} color="#fff" />
        )}
      </div>
      <div className={css.bottomRight}>
        {[1, 2, 5].includes(value) && (
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
