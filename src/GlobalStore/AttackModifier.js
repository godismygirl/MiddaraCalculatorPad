//增伤计算步骤
// 1.提升命中 【夹击】
// 2.提升符号数量 【绝境一击】【身躯大师】
// 3.提升符号伤害【身躯大师】
// 4.提升最终伤害【萎靡】【宿敌】【重锤掌握】

//定义DMG_SETP 1-4 来归类计算过程

//增伤条件 1.基于命中差值【精准射击】2.基于特定状态【背刺】
//增伤数值 1.固定数值【绝大部分技能】2.基于用户输入【狡诈射击】
//增害类型 1.固定类型【物理】【魔法】【绝对】 2.最优类型，根据最终伤害决定最优解

export const DMG_STEP_1 = {
    DARKNESS: { modifier: -1 },
    HINDERING: { modifier: -1 }, //困难地形
    CROSS_ALLY: { modifier: -1 }, //穿盟友
    FLANKING: { modifier: 1 }, //夹击
    TRICK_SHOT: { modifier: -1 }, //狡诈射击
    MASTER_WORK: { modifier: 1 }, //武器升级
};

export const DMG_STEP_2 = {
    COURAGE: {
        modifier: { shield: 1, book: 1, burst: 0 },
    },
    DEAD_END: {
        modifier: { shield: 4, book: 0, burst: 0 },
    },
    MASTER_OF_THE_VESSEL: {
        modifier: { shield: 0, book: 0, burst: 1 },
    },
};

export const DMG_STEP_3 = {
    MASTER_OF_THE_VESSEL: {
        modifier: { shield: 1, book: 1, burst: 1 }, //这里是符号伤害 +1
    },
};

//condition 作为触发条件，params是参数字段名，和calulator主逻辑里的命名一致，以实现自动入参
export const DMG_STEP_4 = {
    HAMMER_HELM: { dmg_type: 'PHYSICAL', dmg: 1 },
    DEVASTATING: { dmg_type: 'PHYSICAL', dmg: 2 },
    TRICK_SHOT: { dmg_type: 'PHYSICAL', dmg: 3 },
    CQC: { dmg_type: 'PHYSICAL', dmg: 1, multiplier: 'USER_INPUT' },
    BACKSTAB: {
        condition: {
            params: ['fieldStatus'],
            run: (fieldStatus) => {
                return fieldStatus?.includes['FLANKING'];
            },
        },
        dmg_type: 'PHYSICAL',
        dmg: 2,
    },
    PRECISE_STRIKE: {
        condition: {
            params: ['attackRoll', 'enemyDefense'],
            run: (roll, def) => {
                return roll - def >= 4;
            },
        },
        dmg_type: 'IRRERUCIBLE',
        dmg: 5,
    },

    WILT: {
        condition: {
            //wilt有移除抗性效果，可以在ui上解决：勾选wilt自动禁用抗性的勾选项
            //如果触发了移除抗性效果，则没有增伤，condition返回false
            params: [
                'enemy',
                'physicalDamage',
                'magicDamage',
                'irreducibleDamage',
            ],
            run: (enemy, phyDmg, magDmg, irrDmg) => {
                if (
                    (enemy.physical_resist || enemy.magic_resist) &&
                    enemy.active_resist.length === 0
                ) {
                    return false;
                }
                return phyDmg > 0 || magDmg > 0 || irrDmg > 0;
            },
        },
        dmg_type: 'IRRERUCIBLE',
        dmg: 2,
    },
    NEMESIS: {
        condition: {
            params: ['physicalDamage', 'magicDamage', 'irreducibleDamage'],
            run: (pd, md, hd) => {
                let pool = [];
                if (pd > 0) {
                    pool.push('PHYSICAL');
                }
                if (md > 0) {
                    pool.push('MAGIC');
                }
                if (hd > 0) {
                    pool.push('IRREDUCIBLE');
                }
                return {
                    available: pool,
                };
            },
        },
        dmg_type: 'OPTIMAL',
        dmg: 2,
    },
    //vow token基于最终伤害增伤，结算顺序要靠后
    VOW: {
        condition: {
            params: ['physicalDamage', 'magicDamage', 'irreducibleDamage'],
            run: (pd, md, hd) => {
                let pool = [];
                if (pd > 0) {
                    pool.push('PHYSICAL');
                }
                if (md > 0) {
                    pool.push('MAGIC');
                }
                if (hd > 0) {
                    pool.push('IRREDUCIBLE');
                }
                return {
                    available: pool,
                };
            },
        },
        dmg_type: 'OPTIMAL',
        multiplier: 'USER_INPUT',
        dmg: 2,
    },
};
