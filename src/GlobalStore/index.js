import { create } from 'zustand';
import { uid } from 'uid';
import { ENEMY_COLLECTION } from './EnemyCollection';
import { WEAPON_CONFIG } from './WeaponConfig';
import { DICE_COLOR_SET } from './DiceColorSet';

const flattenCollection = () => {
    let result = [];
    console.log(ENEMY_COLLECTION);
    Object.keys(ENEMY_COLLECTION)?.forEach((key) =>
        result.push({
            type: key,
            ...ENEMY_COLLECTION[key],
        })
    );
    return result;
};

// {
//     activeEnemy:{},
//     selectedEnemy:[],
//     activeAlly:"",
//     allySet: {
//         remi:{},
//         nightingale:{},
//         rook:{},
//         zeke:{}
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

    return {
        activeEnemy: null,
        setActiveEnemy,
        activeAlly: '',
        setActiveAlly,
        selectedEnemy: [],
        addEnemy,
        removeEnemyByType,
        removeEnemyById,
        updateEnemyStatus,
    };
});

const FLAT_ENEMY_COLLECTION = flattenCollection();

export { FLAT_ENEMY_COLLECTION, WEAPON_CONFIG, DICE_COLOR_SET };
export const ALLY_COLLECTION = ['REMI', 'NIGHTINGALE', 'ROOK', 'ZEKE'];
export default useGlobalStore;
