const dataKeyMapping = {
	month     : 'month',
	exited    : 'Exited',
	extended  : 'Extended',
	confirmed : 'Confirmed',
	active    : 'Confirmed',
};

const getLogStatsData = ({ statsData = [] }) => {
	const chartData = (statsData || []).map((obj) => {
		const newObj = {};

		Object.keys(obj).forEach((key) => {
			if (dataKeyMapping[key] && obj[key] !== '0') { newObj[dataKeyMapping[key]] = obj[key]; }
		});
		return newObj;
	});

	const chartKeys = Object.keys((statsData || [])[0] || {}).filter((key) => key !== 'month'
	&& dataKeyMapping[key]).map(
		(key) => dataKeyMapping[key],
	);

	return { chartData, chartKeys };
};

export default getLogStatsData;
