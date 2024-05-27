import React from "react";
import useGlobalStore from "../GlobalStore";
import { ConfigProvider, theme, Checkbox, Row, Col } from "antd";
import EnemySelect from "./EnemySelect";
import AllySelect from "./AllySelect";
import DodgeSelect from "./DodgeSelect";
import css from "./css.module.css";

const BattleField = () => {
  const {
    selectedEnemy,
    updateEnemyStatus,
    updateEnemyDodge,
    activeEnemy,
    setActiveEnemy,
    eraseEnemyResist,
    restoreEnemyResist,
  } = useGlobalStore();

  const onStatusChange = (id, status) => {
    updateEnemyStatus({ id, status });
  };

  const onCastWilt = (checked, foeId) => {
    if (checked) {
      eraseEnemyResist(foeId);
    } else {
      restoreEnemyResist(foeId);
    }
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={css.box}>
        <AllySelect />
        <div className={css.list}>
          {selectedEnemy?.map((enemy) => (
            <div
              key={enemy.id}
              className={css.item}
              onClick={() => setActiveEnemy(enemy)}
            >
              {activeEnemy?.id === enemy.id && (
                <i className={css.selectedOutline}></i>
              )}

              <div className={css.portait}>
                <img alt="" src={`./portait/${enemy.type}.png`} />
              </div>
              <div className={css.content}>
                {enemy.resistance?.length > 0 && (
                  <div className={css.resistRow}>
                    <Checkbox.Group
                      style={{ width: "100%" }}
                      value={enemy.activeResistance}
                    >
                      <Row>
                        {enemy.resistance.map((r) => (
                          <Col span={12}>
                            <Checkbox value={r} disabled>
                              Reisit {r.toLowerCase()}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </div>
                )}
                <div className={css.statusRow}>
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={(v) => onStatusChange(enemy.id, v)}
                  >
                    <Row gutter={[0, 6]}>
                      <Col span={12}>
                        <Checkbox
                          value="WILT"
                          onChange={(e) =>
                            onCastWilt(e.target.checked, enemy.id)
                          }
                        >
                          Wilt
                        </Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="NEMESIS">Nemisis</Checkbox>
                      </Col>
                      <Col span={12}>
                        <Checkbox value="HINDERING">Hindering</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
                <DodgeSelect
                  value={enemy?.dodge}
                  onChange={(s) => {
                    updateEnemyDodge({ id: enemy.id, dice: s });
                  }}
                />
              </div>
            </div>
          ))}
          <div className={css.footer}>
            <EnemySelect />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default BattleField;
