export const strToKMBT = (val) => {
	let cnt = 0;
	while (val > 999) {
		val /= 1000;
		cnt += 1;
	}
	let num = Number(val).toFixed(2);
	if (num - Math.floor(num) === 0) {
		num = Math.floor(num);
	}
	if (cnt === 1) {
		return (`${num}K`);
	} if (cnt === 2) {
		return (`${num}M`);
	} if (cnt === 3) {
		return (`${num}B`);
	} if (cnt > 3) {
		return (`${num}T`);
	}
	return `${val}`;
};
