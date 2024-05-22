//加伤条件：
//无条件加伤【重锤掌握】
//基于命中差值【精准打击】
//基于最终伤害【萎靡】【宿敌】
//基于特定效果【背刺】

//增伤计算步骤
// 1.提升命中
// 2.提升符号数量
// 3.提升符号伤害
// 4.提升最终伤害

//定义DMG_SETP 1-4 来归类计算过程

const MODIFIER_TYPE = {
    NO_CONDITION: 'NO_CONDITION',
    STATUS: 'STATUS',
    DIFF_ATTACK_ROLL: 'DIFF_ATTACK_ROLL',
    DIFF_DMG: 'DIFF_DMG',
};

const masterVesselCalculator = (tagInput) => {};

const deadEndCalc = () => {};

const nemesisDamageType = () => {};

const courageCalc = () => {};

const cqcCalc = () => {
    //根据距离加伤0-4
};

const MOD_STEP_1 = [
    { name: 'DARKNESS', step: 1, modifier: -1 },
    { name: 'HINDERING', step: 1, modifier: -1 }, //困难地形
    { name: 'CROSS_ALLY', step: 1, modifier: -1 }, //穿盟友
    { name: 'FLANKING', step: 1, modifier: 1 }, //夹击
    { name: 'TRICK_SHOT', step: 1, modifier: -1 }, //狡诈射击
    { name: 'MASTER_WORK', step: 1, modifier: 1 }, //武器升级
];

const MOD_STEP_2 = [
    {
        name: 'COURAGE',
        step: 2,
        modifier: { shield: 1, book: 1, burst: 0 },
    },
    {
        name: 'DEAD_END',
        step: 2,
        modifier: { shield: 4, book: 0, burst: 0 },
    },
    {
        name: 'MASTER_OF_THE_VESSEL',
        step: 2,
        modifier: { shield: 0, book: 0, burst: 1 }, //这里是符号数量 +1
    },
];

const MOD_STEP_3 = [
    {
        name: 'MASTER_OF_THE_VESSEL',
        step: 3,
        modifier: { shield: 1, book: 1, burst: 1 }, //这里是符号伤害 +1
    },
];

const MOD_STEP_4 = [
    { name: 'DEVASTATING', dmg_type: 'PHYSICAL', step: 4, dmg: 2 },
    {
        name: 'BACKSTAB',
        require: {
            type: MODIFIER_TYPE.STATUS,
            value: 'FLANKING',
        },
        dmg_type: 'PHYSICAL',
        step: 4,
        dmg: 2,
    },
    { name: 'TRICK_SHOT', dmg_type: 'PHYSICAL', step: 4, dmg: 3 },
    { name: 'CQC', dmg_type: 'PHYSICAL', step: 4, dmg: cqcCalc },
    {
        name: 'PRECISE_STRIKE',
        require: {
            type: MODIFIER_TYPE.DIFF_ATTACK_ROLL,
            value: 4,
        },
        dmg_type: 'IRRERUCEABLE',
        step: 4,
        dmg: 5,
    },
    { name: 'HAMMER_HELM', dmg_type: 'PHYSICAL', step: 4, dmg: 1 }, //重锤掌握
    { name: 'WILT', dmg_type: 'IRRERUCEABLE', step: 4, dmg: 2 },
    { name: 'NEMESIS', dmg_type: nemesisDamageType, step: 4, dmg: 2 },
];
