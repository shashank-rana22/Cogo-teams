const MAX_THREE_DIGIT_NUMBER = 999;
const MIN_FOUR_DIGIT_NUMBER = 1000;
const INCREASE_COUNT_BY_ONE = 1;
const ROUND_UP_NUMBER = 2;
const EQUAL_TO_ZERO = 0;

const SUFFIX_MAPPING = {
	1 : 'K',
	2 : 'M',
	3 : 'B',
	4 : 'T',
};

export const getFormattedNumber = (val) => {
	let newVal = val;
	let digitRemain = 0;

	while (newVal > MAX_THREE_DIGIT_NUMBER) {
		newVal /= MIN_FOUR_DIGIT_NUMBER;
		digitRemain += INCREASE_COUNT_BY_ONE;
	}

	let num = Number(newVal).toFixed(ROUND_UP_NUMBER);
	const checkLastDigit = num - Math.floor(num);

	if (checkLastDigit === EQUAL_TO_ZERO) {
		num = Math.floor(num);
	}

	const suffix = SUFFIX_MAPPING[digitRemain] || '';
	return suffix ? `${num}${suffix}` : `${newVal}`;
};
