export const groupConainerDetails = (list_shipment_container_details, task) => {
	const GROUPED_DATA = {};

	list_shipment_container_details.forEach((item) => {
		const group_id = item?.container_group_id;

		if (!!group_id && group_id in GROUPED_DATA) {
			GROUPED_DATA[group_id].container_numbers.push({
				label : item?.container_number,
				value : item?.id,
			});
		} else if (group_id) {
			GROUPED_DATA[group_id] = {
				...item,
				service_type      : item?.service_type || task?.service_type,
				container_numbers : [
					{
						label : item?.container_number,
						value : item?.id,
					},
				],
			};
		}
	});

	return GROUPED_DATA;
};
