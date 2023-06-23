const INITIAL_VALUE = 0;
const CHECK_VALUE = 999;
const INITIAL_DIVIDED_VALUE = 1000;
const CHECK_IN_THOUSAND = 1;
const CHECK_IN_MILLION = 2;
const CHECK_IN_BILLION = 3;
const MAXIMUM_PERCENTAGE_VALUE = 100;
const SHOW_STATS_NAME = ['liability_point_value', 'total_burnt_point_value'];

const UNIT_MAPPING = {
	1 : 'K',
	2 : 'M',
	3 : 'B',
};

export const formatValue = (val) => {
	let newVal = val;
	let count = INITIAL_VALUE;

	while (newVal > CHECK_VALUE) {
		newVal /= INITIAL_DIVIDED_VALUE;
		count += CHECK_IN_THOUSAND;
	}

	let num = Number(newVal).toFixed(CHECK_IN_MILLION);

	if (num - Math.floor(num) === INITIAL_VALUE) {
		num = Math.floor(num);
	}

	if (count in UNIT_MAPPING) {
		return `${num}${UNIT_MAPPING[count]}`;
	}

	if (count > CHECK_IN_BILLION) {
		return `${num}T`;
	}

	return `${newVal}`;
};

export const statsPercentageValue = ({ data, name }) => {
	const showStats = !SHOW_STATS_NAME.includes(name);
	const { total_burnt_point_value = '' } = data || {};
	let percentageValue = INITIAL_VALUE;

	if (total_burnt_point_value !== INITIAL_VALUE && showStats && !!data[name]) {
		percentageValue = ((data[name] / total_burnt_point_value) * MAXIMUM_PERCENTAGE_VALUE).toFixed(CHECK_IN_MILLION);
	}

	return `${percentageValue}%`;
};
