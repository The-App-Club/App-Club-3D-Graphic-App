import { MathUtils } from "three";
import { interpolate } from "popmotion";

const bebopTransfrom = (start) => {
  return (end) => {
    return (t) => {
      return MathUtils.mapLinear(t, ...start, ...end);
    };
  };
};

const inMin = 0;
const inMax = 5;
const outMin = 0;
const outMax = 1;
const step = 1;

const cowboy = []
for (let t = inMin; t <= inMax; t = t + step) {
  const three = MathUtils.mapLinear(t, inMin, inMax, outMin, outMax);
  const custom = bebopTransfrom([inMin, inMax])([outMin, outMax])(t);
  const popmotion = interpolate([inMin, inMax], [outMin, outMax])(t);
  cowboy.push({t, three, custom, popmotion})
}
console.table(cowboy);
