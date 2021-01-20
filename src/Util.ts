export interface Mob {
  name: string;
  id: string;
  avoid: number;
  exp: number;
  hp: number;
  immune: boolean[];
  level: number;
  strong: boolean[];
  weak: boolean[];
}

export const getMobs = (world: string) => {
  const data = require("./Monsters/" + world + ".json");
  const mobs: Mob[] = Object.keys(data).map((key) => {
    const mob: Mob = { name: key, ...data[key] };
    return mob;
  });
  return mobs;
};

export const elementChecker = (array: boolean[]) => {
  const arr = [];
  if (array[0]) arr.push("Ice");
  if (array[1]) arr.push("Lightning");
  if (array[2]) arr.push("Fire");
  if (array[3]) arr.push("Poison");
  if (array[4]) arr.push("Holy");
  if (arr.length === 0) arr.push("-");
  return arr;
};

export const doSomeMath = (
  mobLevel: number,
  mobAvoid: number,
  charLevel: number,
  charAcc: number,
  charLuk: number,
  damageType: string
) => {
  let diff = mobLevel - charLevel;
  let acc100 = 0;
  let acc1 = 0;
  let accRatio = 0;
  if (diff < 0) {
    diff = 0;
  }
  if (damageType === "Physical") {
    // prettier-ignore
    acc100 = (55.2 + 2.15 * diff) * (mobAvoid / 15.0);
    acc1 = acc100 * 0.5 + 1;
    // prettier-ignore
    accRatio = 100 * ((charAcc - (acc100 * 0.5)) / (acc100 * 0.5));
  } else {
    let curAcc = Math.floor(charAcc / 10) + Math.floor(charLuk / 10);
    // prettier-ignore
    acc100 = Math.floor((mobAvoid + 1.0) * (1.0 + (0.04 * diff)));
    acc1 = Math.round(0.41 * acc100);
    const accPart = (curAcc - acc1 + 1) / (acc100 - acc1 + 1);
    // prettier-ignore
    accRatio =
      ((-0.7011618132 * Math.pow(accPart, 2)) + (1.702139835 * accPart)) * 100;
  }

  if (accRatio > 100) {
    accRatio = 100;
  } else if (accRatio < 0) {
    accRatio = 0;
  }

  return [
    acc1.toPrecision(3),
    acc100.toPrecision(3),
    accRatio.toPrecision(3) + "%",
  ];
};
