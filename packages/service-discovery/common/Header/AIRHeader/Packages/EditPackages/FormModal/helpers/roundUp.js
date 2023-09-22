const ROUND_FIGURE = 1000000;

const roundUp = (x) => Math.round(x * ROUND_FIGURE) / ROUND_FIGURE;

export default roundUp;
