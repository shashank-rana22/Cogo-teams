const getFormattedData = (simulationData) => {
	let formattedData = {};

	Object.keys(simulationData || {}).forEach((itm) => {
		const value = simulationData?.[itm];

		Object.keys(value).forEach((newItm) => {
			formattedData = {
				...formattedData,
				[newItm]: {
					...(formattedData?.[newItm] || {}),
					[itm]: value?.[newItm],
				},
			};
		});
	});

	return formattedData;
};

export default getFormattedData;
