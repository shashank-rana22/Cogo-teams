const formatDataForSingleService = ({ rawParams }) => {
	const { search_type, trade_type, formValues, primary_service } = rawParams;

	if (search_type === 'fcl_cfs') {
		if (trade_type === 'export') {
			return {
				port_id             : primary_service?.origin_port?.id,
				trade_type,
				cargo_handling_type : formValues?.cargo_handling_type,
			};
		}
		return {
			port_id             : primary_service?.origin_port?.id,
			trade_type,
			cargo_handling_type : formValues?.cargo_handling_type,
		};
	}

	if (search_type === 'fcl_customs') {
		if (trade_type === 'export') {
			return {
				port_id             : primary_service?.origin_port?.id,
				trade_type,
				cargo_handling_type : formValues?.cargo_handling_type,
			};
		} return {
			port_id             : primary_service?.origin_port?.id,
			trade_type,
			cargo_handling_type : formValues?.cargo_handling_type,
		};
	}

	if (search_type === 'trailer_freight') {
		if (trade_type === 'export') {
			return {
				origin_location_id      : formValues?.location_id,
				destination_location_id : primary_service?.origin_port?.id,
				trade_type,
			};
		} return {
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.origin_port?.id,
			trade_type,
		};
	}

	if (search_type === 'ftl_freight') {
		if (trade_type === 'export') {
			return {
				origin_location_id      : formValues?.location_id,
				destination_location_id : primary_service?.origin_port?.id,
				truck_type              : formValues?.truck_type,
				trucks_count            : formValues?.trucks_count,
				trade_type,
			};
		} return {
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.destination_port?.id,
			truck_type              : formValues?.truck_type,
			trucks_count            : formValues?.trucks_count,
			trade_type,
		};
	}

	if (search_type === 'haulage_freight') {
		if (trade_type === 'export') {
			return {
				origin_location_id      : primary_service?.origin_main_port?.id,
				destination_location_id : primary_service?.origin_port?.id,
				trade_type,
				transport_mode          : 'rail',
			};
		} return {
			destination_location_id : primary_service?.destination_main_port?.id,
			origin_location_id      : primary_service?.destination_port?.id,
			trade_type,
		};
	}

	if (search_type === 'fcl_freight_local') {
		if (trade_type === 'export') {
			return {
				port_id: primary_service?.origin_port?.id,
				trade_type,
			};
		} return {
			port_id: primary_service?.destination_port?.id,
			trade_type,
		};
	}

	return null;
};

const formatPayload = ({
	formValues = {},
	service = {},
	shipmentData = {},
	primary_service,
}) => {
	const search_type = service.service;

	let trade_type;

	if (service?.type === 'origin') {
		trade_type = 'export';
	}

	if (service.type === 'destination') {
		trade_type = 'import';
	}

	const rawParams = {
		trade_type,
		search_type,
		primary_service,
		formValues,

	};

	const newPayload = {
		source_id: shipmentData?.id,
		search_type,
	};

	newPayload[`${search_type}_services_attributes`] = formatDataForSingleService({
		rawParams,
	});

	return {
		payload: newPayload,
	};
};

export default formatPayload;
