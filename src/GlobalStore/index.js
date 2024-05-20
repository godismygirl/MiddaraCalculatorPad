import React, { useState } from 'react';
import { uid } from 'uid';
import { ENEMY_COLLECTION } from './EnemyCollection';
import { WEAPON_CONFIG } from './WeaponConfig';

const flattenCollection = () => {
    let result = [];
    Object.keys(ENEMY_COLLECTION)?.forEach((key) =>
        result.push({
            type: key,
            ...ENEMY_COLLECTION[key],
        })
    );
    return result;
};

const GlobalStore = () => {
    const [activeEnemy, setActiveEnemy] = useState();
    const [selectedEnemy, setSelectedEnemy] = useState([]);

    const addEnemy = (enemy) => {
        selectedEnemy.push({
            id: uid(),
            ...enemy,
        });
        setSelectedEnemy([...selectedEnemy]);
    };

    const removeEnemyByType = (enemyType) => {
        const foeIndex = selectedEnemy.findIndex(
            (foe) => foe.type === enemyType
        );
        if (foeIndex !== -1) {
            selectedEnemy.splice(foeIndex, 1);
            setSelectedEnemy([...selectedEnemy]);
        }
    };

    const removeEnemyById = (enemyId) => {
        const foeIndex = selectedEnemy.findIndex((foe) => foe.id === enemyId);
        if (foeIndex !== -1) {
            selectedEnemy.splice(foeIndex, 1);
            setSelectedEnemy([...selectedEnemy]);
        }
    };

    const getEnemyCount = (enemyType) => {
        const foes = selectedEnemy.filter((foe) => foe.type === enemyType);
        return foes?.length;
    };

    const updateEnemyStatus = ({ id, status }) => {
        const target = selectedEnemy.find((foe) => foe.id === id);
        target.status = status;
    };

    return {
        addEnemy,
        removeEnemyByType,
        removeEnemyById,
        getEnemyCount,
        selectedEnemy,
        updateEnemyStatus,
        activeEnemy,
        setActiveEnemy,
    };
};

const FLAT_ENEMY_COLLECTION = flattenCollection();

export { FLAT_ENEMY_COLLECTION };
export { WEAPON_CONFIG };
export default GlobalStore;
