const MIN_THREE_DIGIT_NUMBER = 999;
const MAX_FOUR_DIGIT_NUMBER = 1000;
const INCREASE_CNT_BY_ONE = 1;
const ROUND_UP_NUMBER = 2;
const CHECK_INTEGER_NUMBER = 0;

const SUFFIX_MAPPING = {
	1 : 'K',
	2 : 'M',
	3 : 'B',
	4 : 'T',
};

export const getFormattedNumber = (val) => {
	let newVal = val;
	let digitRemain = 0;

	while (newVal > MIN_THREE_DIGIT_NUMBER) {
		newVal /= MAX_FOUR_DIGIT_NUMBER;
		digitRemain += INCREASE_CNT_BY_ONE;
	}

	let num = Number(newVal).toFixed(ROUND_UP_NUMBER);

	if (num - Math.floor(num) === CHECK_INTEGER_NUMBER) {
		num = Math.floor(num);
	}

	const suffix = SUFFIX_MAPPING[digitRemain] || '';
	return suffix ? `${num}${suffix}` : `${newVal}`;
};
