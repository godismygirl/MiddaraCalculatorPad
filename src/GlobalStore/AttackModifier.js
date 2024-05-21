//加伤条件：
//无条件加伤【重锤掌握】
//基于命中差值【精准打击】
//基于最终伤害【萎靡】【宿敌】
//基于特定效果【背刺】

const MODIFIER_TYPE = {
    NO_CONDITION: 'NO_CONDITION',
    STATUS: 'STATUS',
    DIFF_ATTACK_ROLL: 'DIFF_ATTACK_ROLL',
    DIFF_DMG: 'DIFF_DMG',
};

const masterVesselCalculator = (tagInput) => {};

const nemesisDamageType = () => {};

const courageCalc = () => {};

export const AC_MODIFIER = [
    { name: 'DARKNESS', ATTACK_ROLL: -1 },
    { name: 'HINDERING', ATTACK_ROLL: -1 }, //困难地形
    { name: 'CROSS_ALLY', ATTACK_ROLL: -1 }, //穿盟友
    { name: 'FLANKING', ATTACK_ROLL: 1 }, //夹击
    { name: 'TRICK_SHOT', ATTACK_ROLL: -1 }, //狡诈射击
    { name: 'MASTER_WORK', ATTACK_ROLL: 1 }, //武器升级
];

export const DMG_MODIFIER = [
    {
        name: 'BACKSTAB',
        require: {
            type: MODIFIER_TYPE.STATUS,
            value: 'FLANKING',
        },
        dmg_type: 'PHYSICAL',
        dmg: 2,
    },
    //技能
    { name: 'TRICK_SHOT', dmg_type: 'PHYSICAL', dmg: 3 },
    { name: 'C.Q.C', dmg_type: 'PHYSICAL', dmg: 0 },
    {
        name: 'PRECISE_STRIKE',
        require: {
            type: MODIFIER_TYPE.DIFF_ATTACK_ROLL,
            value: 4,
        },
        dmg_type: 'IRRERUCEABLE',
        dmg: 5,
    },
    { name: 'HAMMER_HELM', dmg_type: 'PHYSICAL', dmg: 1 }, //重锤掌握
    { name: 'HAMMER_HELM', dmg_type: 'PHYSICAL', dmg: 1 },
    {
        name: 'MASTER_OF_THE_VESSEL',
        dmg_type: 'PHYSICAL',
        dmg: masterVesselCalculator,
    },
    //buff
    { name: 'COURAGE', dmg_type: 'BOTH', dmg: courageCalc },
    { name: 'WILT', dmg_type: 'IRRERUCEABLE', dmg: 2 },
    { name: 'NEMESIS', dmg_type: nemesisDamageType, dmg: 2 },
];
