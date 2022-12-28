const getHoursElasped = (confirmed_by_importer_exporter_at) => {
	const current_date = new Date();

	const date_of_comfirmation = new Date(confirmed_by_importer_exporter_at);

	const time_elasped_in_hours = ((current_date - date_of_comfirmation) % 86400000) / 3600000;

	const time_elasped_in_minutes = Math.floor(
		(((current_date - date_of_comfirmation) % 86400000) % 3600000) / 60000,
	);

	return `${Math.floor(
		time_elasped_in_hours,
	)} Hrs : ${time_elasped_in_minutes} Min`;
};

export default getHoursElasped;
