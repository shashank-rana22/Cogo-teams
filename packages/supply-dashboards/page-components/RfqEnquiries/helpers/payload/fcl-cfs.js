const fclCfsPayload = ({ service, value }) => {
	const line_items = [];
	value?.freights.forEach((item) => {
		const val = {
			code     : item?.code,
			unit     : item?.unit,
			currency : item?.currency,
			price    : Number(item?.price),
		};
		line_items.push(val);
	});

	const payload = {
		service_provider_id : value?.service_provider_id,
		sourced_by_id       : value?.sourced_by_id,
		spot_negotiation_id : service?.id,
		data                : {
			line_items,
		},
	};

	return payload;
};

export default fclCfsPayload;
