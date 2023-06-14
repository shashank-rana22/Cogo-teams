const INITIAL_VALUE = 0;
const CHECK_VALUE = 999;
const INITIAL_DIVIDED_VALUE = 1000;
const CHECK_IN_THOUSAND = 1;
const CHECK_IN_MILLION = 2;
const CHECK_IN_BILLION = 3;
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
