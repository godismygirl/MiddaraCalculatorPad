import React, { useState } from "react";
import useGlobalStore from "../GlobalStore";
import { FLAT_ENEMY_COLLECTION } from "../GlobalStore";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import css from "./css.module.css";

const FoeSelectPanel = () => {
  const { removeEnemyByType, addEnemy, selectedEnemy } = useGlobalStore();
  const [open, setOpen] = useState(false);

  const getFoeCount = (enemyType) => {
    const pool = selectedEnemy.filter((foe) => foe.type === enemyType);
    return pool?.length;
  };

  return (
    <>
      <div className={css.container} style={{ top: open ? 0 : "-35vh" }}>
        <div className={css.toggler} onClick={() => setOpen(!open)}>
          Select Enemy
        </div>
        <div className={css.panel}>
          {FLAT_ENEMY_COLLECTION?.map((el) => {
            const count = getFoeCount(el.type);
            return (
              <div key={el.type} className={css.block}>
                <img alt="" src={`./portait/${el.type}.png`} />
                <div className={css.action}>
                  <i
                    className={count > 0 ? css.btn : css.disabledBtn}
                    onClick={() => removeEnemyByType(el.type)}
                  >
                    <MinusOutlined />
                  </i>
                  <div
                    className={css.count}
                    style={{
                      color: count > 0 ? "#f50" : "#555",
                    }}
                  >
                    {count}
                  </div>
                  <i className={css.btn} onClick={() => addEnemy(el)}>
                    <PlusOutlined />
                  </i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {open && <div className={css.mask} onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default FoeSelectPanel;
