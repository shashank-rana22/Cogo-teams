const dataKeyMapping = {
	month                  : 'month',
	exited                 : 'Exited',
	employees_in_pip       : 'In PIP',
	extended               : 'Extended',
	confirmed              : 'Confirmed',
	employees_in_probation : 'In Probation',
	active                 : 'Active',
};

const getLogStatsData = (statsData) => {
	const pipStatsData = (statsData.pip || []).map((obj) => {
		const newObj = {};

		Object.keys(obj).forEach((key) => {
			newObj[dataKeyMapping[key]] = obj[key];
		});
		return newObj;
	});

	const pipStatsKeys = Object.keys((statsData.pip || [])[0] || {}).filter((key) => key !== 'month').map(
		(key) => dataKeyMapping[key],
	);

	const probationStatsData = (statsData.probation || []).map((obj) => {
		const newObj = {};
		Object.keys(obj).forEach((key) => { newObj[dataKeyMapping[key]] = obj[key]; });
		return newObj;
	});
	const probationStatsKeys = Object.keys((statsData.probation || [])[0] || {}).filter((key) => key !== 'month').map(
		(key) => dataKeyMapping[key],
	);

	return { pipStatsData, pipStatsKeys, probationStatsData, probationStatsKeys };
};

export default getLogStatsData;
