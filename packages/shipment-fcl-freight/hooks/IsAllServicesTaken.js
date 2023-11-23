const isAllServicesTaken = (
	selectedParties,
	allServiceLineitemsCount,
) => {
	let allServicesTaken = [];
	selectedParties.forEach((party) => {
		allServicesTaken.push(...(party.services || []));
	});

	allServicesTaken = allServicesTaken.map((service) => service.service_id);

	let isAllMainServicesTaken = true;

	if (allServicesTaken.length !== allServiceLineitemsCount) {
		isAllMainServicesTaken = false;
	}
	return { isAllMainServicesTaken };
};

export default isAllServicesTaken;
