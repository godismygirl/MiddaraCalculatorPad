import {
  DMG_STEP_1,
  DMG_STEP_2,
  DMG_STEP_3,
  DMG_STEP_4,
} from "./AttackModifier";

const isValid = ({ enemy, preset }) => {
  if (!enemy) {
    console.error("Please target an enemy first");
    return false;
  }

  if (!(preset.diceA && preset.diceB)) {
    console.error("Please roll both your die");
    return false;
  }

  if (!(preset.symbol_shield && preset.symbol_book && preset.symbol_burst)) {
    console.error("Please chose symbol ability");
    return false;
  }

  return true;
};

export const calculate = ({ enemy, preset, userInput }) => {
  //先校验合法
  const valid = isValid({ enemy, preset });
  if (!valid) return;

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
  loopPlace(enemy.status);
  loopPlace(preset.weapon_upgrade);
  loopPlace(preset.field_status);
  loopPlace(preset.discripline);

  //1.计算命中
  if (preset.empower?.base === 6) {
    //黑骰子大失败
    alert("attack missed");
    return;
  }

  let attackRoll = preset.diceA.base + preset.diceB.base;
  hit_step?.forEach((md) => {
    attackRoll += DMG_STEP_1[md].modifier;
  });
  console.log("=== attack roll ===", attackRoll);
  let def = enemy.def;
  if (attackRoll < def) {
    alert("attack missed");
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
  console.log("=== shield book burst ===", totalShield, totalBook, totalBurst);

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
  if (burst_dmg_type === "PHYSICAL") {
    physical_symbol_dmg += burst_damge;
  } else {
    magic_symbol_dmg += burst_damge;
  }
  console.log("=== symbol dmg ===", physical_symbol_dmg, magic_symbol_dmg);

  //4.计算最终伤害

  return {
    physical: 0,
    magic: 0,
  };
};
