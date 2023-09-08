const ONE_MILLI_SECOND = 60000;
const DECIMAL_VALUE = 0;

export default function getFormattedTimeInMilliSecond(timeoutValues) {
	return Object.keys(timeoutValues).reduce((result, key) => ({
		...result,
		[key]: Number((timeoutValues[key] * ONE_MILLI_SECOND).toFixed(DECIMAL_VALUE)),
	}), {});
}
