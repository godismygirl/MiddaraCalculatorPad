//增伤计算步骤
// 1.提升命中 【夹击】
// 2.提升符号数量 【绝境一击】【身躯大师】
// 3.提升符号伤害【身躯大师】
// 4.提升最终伤害【萎靡】【宿敌】【重锤掌握】

//定义DMG_SETP 1-4 来归类计算过程

const MODIFIER_TYPE = {
  NO_CONDITION: "NO_CONDITION",
  STATUS: "STATUS",
  DIFF_ATTACK_ROLL: "DIFF_ATTACK_ROLL",
  DIFF_DMG: "DIFF_DMG",
};

const masterVesselCalculator = (tagInput) => {};

const deadEndCalc = () => {};

const nemesisDamageType = () => {};

const courageCalc = () => {};

const cqcCalc = () => {
  //根据距离加伤0-4
};

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

export const DMG_STEP_4 = {
  DEVASTATING: { dmg_type: "PHYSICAL", dmg: 2 },
  BACKSTAB: {
    require: {
      type: MODIFIER_TYPE.STATUS,
      value: "FLANKING",
    },
    dmg_type: "PHYSICAL",

    dmg: 2,
  },
  TRICK_SHOT: { dmg_type: "PHYSICAL", dmg: 3 },
  CQC: { dmg_type: "PHYSICAL", dmg: cqcCalc },
  PRECISE_STRIKE: {
    require: {
      type: MODIFIER_TYPE.DIFF_ATTACK_ROLL,
      value: 4,
    },
    dmg_type: "IRRERUCEABLE",
    dmg: 5,
  },
  HAMMER_HELM: { dmg_type: "PHYSICAL", dmg: 1 },
  WILT: { dmg_type: "IRRERUCEABLE", dmg: 2 },
  NEMESIS: { dmg_type: nemesisDamageType, dmg: 2 },
};
