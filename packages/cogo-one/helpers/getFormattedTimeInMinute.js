const ONE_MINUTE = 60000;
const DECIMAL_VALUE = 0;

export default function getFormattedTimeInMinute(mapping) {
	return Object.keys(mapping).reduce((result, key) => ({
		...result,
		[key]: (mapping[key] / ONE_MINUTE).toFixed(DECIMAL_VALUE),
	}), {});
}
