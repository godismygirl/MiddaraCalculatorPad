import { message } from 'antd';
import Alert from '../comps/Alert';
import {
    DMG_STEP_1,
    DMG_STEP_2,
    DMG_STEP_3,
    DMG_STEP_4,
} from './AttackModifier';

const isValid = ({ enemy, preset }) => {
    if (!enemy) {
        message.error('Please target an enemy first');
        return false;
    }

    if (!(preset.diceA && preset.diceB)) {
        message.error('Please roll both your die');
        return false;
    }

    if (!(preset.symbol_shield && preset.symbol_book && preset.symbol_burst)) {
        message.error('Please chose symbol ability');
        return false;
    }

    return true;
};

const replaceOrder = (arr) => {
    //把wilt,nemesis,vow按顺序放在数组最后
    const loopPush = (effectName) => {
        const index = arr.indexOf(effectName);
        if (index !== -1 && index !== arr.length - 1) {
            arr.push(arr.splice(index, 1)[0]);
        }
    };
    loopPush('WILT');
    loopPush('NEMESIS');
    loopPush('VOW');
};

export const calculate = ({ enemy, preset, userInput }) => {
    //先校验合法
    //alertSkull();
    //alertMissed({ attack: 10, defense: 15 });
    //alertDamage({ total: 30, physical: 12, magic: 10, irreducible: 8 });
    const valid = isValid({ enemy, preset });
    if (!valid) return;

    //paramCenter用来存储需要被伤害函数消费的入参
    let paramCenter = {
        enemy,
        attackRoll: 0,
        enemyDefense: 0,
        fieldStatus: preset.field_status,
        physicalDamage: 0,
        magicDamage: 0,
        irreducibleDamage: 0,
    };

    const hit_step = []; //1.命中增幅
    const symbel_number_step = []; //符号数量增幅
    const symbol_damage_step = []; //符号伤害增幅
    const final_damage_step = []; //最终伤害增幅

    const loopPlace = (arr) => {
        arr?.forEach((st) => {
            if (DMG_STEP_1?.[st]) {
                hit_step.push(st);
            }
            if (DMG_STEP_2?.[st]) {
                symbel_number_step.push(st);
            }
            if (DMG_STEP_3?.[st]) {
                symbol_damage_step.push(st);
            }
            if (DMG_STEP_4?.[st]) {
                final_damage_step.push(st);
            }
        });
    };
    //数据准备
    loopPlace(preset.weapon_upgrade);
    loopPlace(preset.discripline);
    loopPlace(enemy.status);
    loopPlace(preset.field_status);
    replaceOrder(final_damage_step); //[wilt][nemesis][vow]属于结算最靠后的效果，所以要调整它们在step4中的位置,非常重要！！！
    console.log('final_damage_step', final_damage_step);

    //1.计算命中
    if (preset.empower?.base === 99) {
        //黑骰子大失败
        Alert.skull();
        return;
    }

    paramCenter.attackRoll = preset.diceA.base + preset.diceB.base;
    hit_step?.forEach((md) => {
        paramCenter.attackRoll += DMG_STEP_1[md].modifier;
    });
    console.log('=== attack roll ===', paramCenter.attackRoll);
    paramCenter.enemyDefense = enemy.def;
    if (enemy.dodge) {
        paramCenter.enemyDefense += enemy.dodge.shield;
        if (enemy.passive?.includes('NIMBLE') && enemy.dodge.base !== 99) {
            paramCenter.enemyDefense++;
        }
    }

    if (paramCenter.attackRoll - paramCenter.enemyDefense < 0) {
        Alert.missed({
            attack: paramCenter.attackRoll,
            defense: paramCenter.enemyDefense,
        });

        return;
    }

    //2.计算符号数量
    let totalShield = preset.diceA.shield + preset.diceB.shield;
    let totalBook = preset.diceA.book + preset.diceB.book;
    let totalBurst = preset.diceA.burst + preset.diceB.burst;

    if (preset.empower) {
        totalShield += preset.empower.shield;
        totalBook += preset.empower.book;
        totalBurst += preset.empower.burst;
    }
    symbel_number_step?.forEach((sn) => {
        totalShield += DMG_STEP_2[sn].modifier.shield;
        totalBook += DMG_STEP_2[sn].modifier.book;
        totalBurst += DMG_STEP_2[sn].modifier.burst;
    });
    console.log(
        '=== shield book burst ===',
        totalShield,
        totalBook,
        totalBurst
    );

    //奥术无视所有符号
    if (enemy.passive?.includes('ARCANE')) {
        totalShield = 0;
        totalBook = 0;
        totalBurst = 0;
    }

    //3.计算符号伤害  { shield: 2, dmg: 3, type: "PHYSICAL" },
    const shield_unit = preset.symbol_shield.shield;
    let shield_dmg = preset.symbol_shield.dmg;

    const book_unit = preset.symbol_book.book;
    let book_dmg = preset.symbol_book.dmg;

    const burst_unit = preset.symbol_burst.burst;
    let burst_dmg = preset.symbol_burst.dmg;
    const burst_dmg_type = preset.symbol_burst.type;

    symbol_damage_step?.forEach((sd) => {
        shield_dmg += DMG_STEP_3[sd].modifier.shield;
        book_dmg += DMG_STEP_3[sd].modifier.book;
        burst_dmg += DMG_STEP_3[sd].modifier.burst;
    });

    let physical_symbol_dmg =
        Number.parseInt(totalShield / shield_unit) * shield_dmg;
    let magic_symbol_dmg = Number.parseInt(totalBook / book_unit) * book_dmg;
    let burst_damge = Number.parseInt(totalBurst / burst_unit) * burst_dmg;
    if (burst_dmg_type === 'PHYSICAL') {
        physical_symbol_dmg += burst_damge;
    } else {
        magic_symbol_dmg += burst_damge;
    }
    console.log('=== symbol dmg ===', physical_symbol_dmg, magic_symbol_dmg);

    //4.计算最终伤害
    paramCenter.physicalDamage =
        paramCenter.attackRoll - paramCenter.enemyDefense + physical_symbol_dmg;
    paramCenter.magicDamage = magic_symbol_dmg;

    final_damage_step?.forEach((fd) => {
        let condition = true;

        if (DMG_STEP_4[fd].condition) {
            const params = DMG_STEP_4[fd].condition.params.map(
                (p) => paramCenter[p]
            );
            condition = DMG_STEP_4[fd].condition.run(...params);
        }

        if (condition) {
            //增伤条件通过
            const multiplier =
                DMG_STEP_4[fd]?.multiplier === 'USER_INPUT' ? userInput[fd] : 1;
            const dmg = DMG_STEP_4[fd].dmg * multiplier;

            switch (DMG_STEP_4[fd].dmg_type) {
                case 'PHYSICAL':
                    paramCenter.physicalDamage += dmg;
                    break;
                case 'MAGIC':
                    paramCenter.magicDamage += dmg;
                    break;
                case 'IRRERUCIBLE':
                    paramCenter.irreducibleDamage += dmg;
                    break;
                default: {
                    //OPTIMAL
                    //增伤选择和怪抗性有关联 condition.available返回可增伤类型
                    //可增伤种类唯一时，直接结算
                    if (condition.available.length <= 1) {
                        const t = condition.available?.[0];
                        if (t === 'PHYSICAL') paramCenter.physicalDamage += dmg;
                        if (t === 'MAGIC') paramCenter.magicDamage += dmg;
                        if (t === 'irreducible')
                            paramCenter.irreducibleDamage += dmg;
                        return;
                    }

                    //增伤类型绝对伤害最优先
                    if (condition.available.includes('IRREDUCIBLE')) {
                        paramCenter.irreducibleDamage += dmg;
                        return;
                    }

                    //剩下的情况只有一种：同时包含 MAGIC PHYSIC
                    //魔法伤害优先，仅当怪有魔法抗性且无物理抗性时，选择物理伤害
                    if (
                        enemy.activeResistance.includes('MAGIC') &&
                        !enemy.activeResistance.includes('PHYSICAL')
                    ) {
                        paramCenter.physicalDamage += dmg;
                        return;
                    }

                    paramCenter.magicDamage += dmg;
                }
            }
        }
    });

    //最后结算抗性
    if (enemy.activeResistance.includes('PHYSICAL')) {
        if (paramCenter.physicalDamage !== 1) {
            paramCenter.physicalDamage = Number.parseInt(
                paramCenter.physicalDamage / 2
            );
        }
    }

    if (enemy.activeResistance.includes('MAGIC')) {
        if (paramCenter.magicDamage !== 1) {
            paramCenter.magicDamage = Number.parseInt(
                paramCenter.magicDamage / 2
            );
        }
    }

    const totalDamage =
        paramCenter.physicalDamage +
        paramCenter.magicDamage +
        paramCenter.irreducibleDamage;

    Alert.damage({
        total: totalDamage,
        physical: paramCenter.physicalDamage,
        magic: paramCenter.magicDamage,
        irreducible: paramCenter.irreducibleDamage,
    });

    return {
        physical: paramCenter.physicalDamage,
        magic: paramCenter.magicDamage,
        irreducible: paramCenter.irreducibleDamage,
        total:
            paramCenter.physicalDamage +
            paramCenter.magicDamage +
            paramCenter.irreducibleDamage,
    };
};
