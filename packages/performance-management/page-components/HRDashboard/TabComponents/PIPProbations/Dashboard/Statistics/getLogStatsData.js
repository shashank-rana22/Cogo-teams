const dataKeyMapping = {
	month                  : 'month',
	exited                 : 'Exited',
	employees_in_pip       : 'In PIP',
	extended               : 'Extended',
	confirmed              : 'Confirmed',
	employees_in_probation : 'In Probation',
	active                 : 'Active',
};

const getLogStatsData = ({ statsData = [] }) => {
	const chartData = (statsData || []).map((obj) => {
		const newObj = {};

		Object.keys(obj).forEach((key) => {
			newObj[dataKeyMapping[key]] = obj[key];
		});
		return newObj;
	});

	const chartKeys = Object.keys((statsData || [])[0] || {}).filter((key) => key !== 'month').map(
		(key) => dataKeyMapping[key],
	);

	return { chartData, chartKeys };
};

export default getLogStatsData;
