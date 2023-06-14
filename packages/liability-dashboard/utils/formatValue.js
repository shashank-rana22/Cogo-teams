const INITIAL_VALUE = 0;
const CHECK_VALUE = 999;
const INITIAL_DIVIDED_VALUE = 1000;
const CHECK_IN_THOUSAND = 1;
const CHECK_IN_MILLION = 2;
const CHECK_IN_BILLION = 3;
const MAXIMUM_PERCENTAGE_VALUE = 100;

export const formatValue = (val) => {
	let newVal = val;
	let cnt = INITIAL_VALUE;
	while (newVal > CHECK_VALUE) {
		newVal /= INITIAL_DIVIDED_VALUE;
		cnt += CHECK_IN_THOUSAND;
	}
	let num = Number(newVal).toFixed(CHECK_IN_MILLION);
	if (num - Math.floor(num) === INITIAL_VALUE) {
		num = Math.floor(num);
	}
	if (cnt === CHECK_IN_THOUSAND) {
		return (`${num}K`);
	} if (cnt === CHECK_IN_MILLION) {
		return (`${num}M`);
	} if (cnt === CHECK_IN_BILLION) {
		return (`${num}B`);
	} if (cnt > CHECK_IN_BILLION) {
		return (`${num}T`);
	}
	return `${newVal}`;
};

export const statsPercentageValue = ({ data, name }) => {
	const showStats = name !== 'liability_point_value' && name !== 'total_burnt_point_value';
	const { total_burnt_point_value = '' } = data || {};
	let percentageValue = INITIAL_VALUE;
	if (total_burnt_point_value !== INITIAL_VALUE && showStats) {
		percentageValue = ((data[name] / total_burnt_point_value) * MAXIMUM_PERCENTAGE_VALUE).toFixed(CHECK_IN_MILLION);
	}

	return `${percentageValue}%`;
};
