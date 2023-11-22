const getUpdateTaskPayload = ({ task, formValues, shipment_data }) => {
	const { cargo_readiness_date } = formValues || {};
	const payload = {
		id     : task?.id,
		status : 'pending',
		tags   : ['1'],
		data   : {
			fcl_freight_service: {
				shipment_id: shipment_data?.id,
				cargo_readiness_date,
			},
		},
	};
	return payload;
};

export default getUpdateTaskPayload;
