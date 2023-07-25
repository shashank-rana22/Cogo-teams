const MIN_THREE_DIGIT_NUMBER = 999;
const MAX_FOUR_DIGIT_NUMBER = 1000;
const INCREASE_CNT_BY_ONE = 1;
const ROUND_UP_NUMBER = 2;
const CHECK_NUMBER_IS_ZERO = 0;
const CHECK_NUMBER_IS_ONE = 1;
const CHECK_NUMBER_IS_TWO = 2;
const CHECK_NUMBER_IS_THREE = 3;

export const getFormattedNumber = (val) => {
	let newVal = val;
	let digitRemain = 0;
	while (newVal > MIN_THREE_DIGIT_NUMBER) {
		newVal /= MAX_FOUR_DIGIT_NUMBER;
		digitRemain += INCREASE_CNT_BY_ONE;
	}

	let num = Number(newVal).toFixed(ROUND_UP_NUMBER);

	if (num - Math.floor(num) === CHECK_NUMBER_IS_ZERO) {
		num = Math.floor(num);
	}

	if (digitRemain === CHECK_NUMBER_IS_ONE) {
		return (`${num}K`);
	} if (digitRemain === CHECK_NUMBER_IS_TWO) {
		return (`${num}M`);
	} if (digitRemain === CHECK_NUMBER_IS_THREE) {
		return (`${num}B`);
	} if (digitRemain > CHECK_NUMBER_IS_THREE) {
		return (`${num}T`);
	}
	return `${newVal}`;
};
