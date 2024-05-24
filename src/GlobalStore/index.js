import { create } from "zustand";
import { uid } from "uid";
import { ENEMY_COLLECTION } from "./EnemyCollection";
import { WEAPON_CONFIG } from "./WeaponConfig";
import { DICE_COLOR_SET, BLACK_DICE_SET } from "./DiceColorSet";
import { calculate } from "./calculator";

// {
//     activeEnemy:{},
//     selectedEnemy:[],
//     activeAlly:"",
//     allySave: {
//         REMI:{},
//         NIGHTINGALE:{},
//         ROOK:{},
//         ZEKE:{}
//     }
// }

const useGlobalStore = create((set) => {
  const addEnemy = (enemy) => {
    set((state) => {
      const se = [...state.selectedEnemy];
      se.push({
        id: uid(),
        ...enemy,
      });
      return { selectedEnemy: se };
    });
  };

  const removeEnemyByType = (enemyType) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const foeIndex = se.findIndex((foe) => foe.type === enemyType);
      if (foeIndex !== -1) {
        se.splice(foeIndex, 1);
        return { selectedEnemy: se };
      }
    });
  };

  const removeEnemyById = (enemyId) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const foeIndex = se.findIndex((foe) => foe.id === enemyId);
      if (foeIndex !== -1) {
        se.splice(foeIndex, 1);
        return { selectedEnemy: se };
      }
    });
  };

  const setActiveEnemy = (enemy) => {
    set(() => ({ activeEnemy: enemy }));
  };

  const setActiveAlly = (allyName) => {
    set(() => ({ activeAlly: allyName }));
  };

  const updateEnemyStatus = ({ id, status }) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const target = se.find((foe) => foe.id === id);
      target.status = status;
      return { selectedEnemy: se };
    });
  };

  const updateEnemyDodge = ({ id, dice }) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const target = se.find((foe) => foe.id === id);
      target.dodge = dice;
      return { selectedEnemy: se };
    });
  };

  const eraseEnemyResist = (id) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const target = se.find((foe) => foe.id === id);
      target.active_resist = [];
      return { selectedEnemy: se };
    });
  };

  const restoreEnemyResist = (id) => {
    set(({ selectedEnemy }) => {
      const se = [...selectedEnemy];
      const target = se.find((foe) => foe.id === id);
      target.active_resist = [];
      if (target.physical_resist) {
        target.active_resist.push("PHYSICAL");
      }
      if (target.magic_resist) {
        target.active_resist.push("MAGIC");
      }
      if (target.ranged_resist) {
        target.active_resist.push("RANGED");
      }
      return { selectedEnemy: se };
    });
  };

  const updateAllySave = (data) => {
    set(({ activeAlly, allySave }) => ({
      allySave: { ...allySave, [activeAlly]: data },
    }));
  };

  const calculateDamage = () => {
    set(({ activeEnemy, activeAlly, allySave }) => ({
      damageDealt: calculate({
        enemy: activeEnemy,
        preset: allySave[activeAlly].preset,
        userInput: allySave[activeAlly].userInput,
      }),
    }));
  };

  return {
    damageDealt: {
      total: 0,
      physical: 0,
      magic: 0,
      irreducible: 0,
    },
    allySave: {},
    activeEnemy: null,
    setActiveEnemy,
    activeAlly: "",
    setActiveAlly,
    selectedEnemy: [],
    addEnemy,
    removeEnemyByType,
    removeEnemyById,
    updateEnemyStatus,
    updateEnemyDodge,
    eraseEnemyResist,
    restoreEnemyResist,
    updateAllySave,
    calculateDamage,
  };
});

export { ENEMY_COLLECTION, WEAPON_CONFIG, DICE_COLOR_SET, BLACK_DICE_SET };
export const ALLY_COLLECTION = ["REMI", "NIGHTINGALE", "ROOK", "ZEKE"];
export default useGlobalStore;
