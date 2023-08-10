import { HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';

const TYPE_NUMBER_FIELDS = ['length', 'width', 'height', 'packages_count', 'package_weight', 'trucks_count'];

const formattedAsNumberData = (values) => {
	const formattedValues = {};
	Object.entries(values).forEach(([key, val]) => {
		if (TYPE_NUMBER_FIELDS.includes(key) && typeof val === 'string') {
			formattedValues[key] = parseInt(val, 10);
		} else {
			formattedValues[key] = val;
		}
	});
	return formattedValues;
};

const formatDataForSingleService = ({ rawParams = {} }) => {
	const { trade_type = '', search_type = '', primary_service = {}, formValues = {} } = rawParams || {};

	const {
		port,
		commodity,
		bls_count,
		container_size,
		container_type,
		containers_count,
	} = primary_service || {};

	const common = {
		containers_count : Number(containers_count),
		container_size,
		container_type,
		status           : 'active',
		trade_type,
	};

	const common2 = {
		bls_count: Number(bls_count || 1),
	};

	if (search_type === 'fcl_customs') {
		if (trade_type === 'export') {
			return [{
				port_id             : port?.id,
				...common,
				...common2,
				cargo_handling_type : formValues?.cargo_handling_type,
			}];
		} return [{
			location_id: port?.id,
			...common,
			...common2,
		}];
	}

	if (search_type === 'fcl_cfs') {
		if (trade_type === 'export') {
			return [{
				port_id             : port?.id,
				...common,
				...common2,
				cargo_handling_type : formValues?.cargo_handling_type,
			}];
		} return [{
			location_id: port?.id,
			...common,
			...common2,
		}];
	}

	if (search_type === 'trailer_freight') {
		if (trade_type === 'export') {
			return [{
				origin_location_id     : formValues?.location_id,
				destination_country_id : port?.id,
				...common,
				commodity              : HAZ_CLASSES.includes(commodity) ? commodity : null,
				packages               : formValues?.packages?.map((obj) => formattedAsNumberData(obj)),
			}];
		}
		return [{
			destination_location_id : formValues?.location_id,
			origin_country_id       : port?.id,
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
			...common,
			packages                : formValues?.packages?.map((obj) => formattedAsNumberData(obj)),
		}];
	}

	if (search_type === 'ftl_freight') {
		if (trade_type === 'export') {
			return [{
				origin_location_id      : formValues?.location_id,
				destination_location_id : port?.id,
				trip_type               : 'one_way',
				truck_type              : formValues?.truck_type,
				trucks_count            : Number(formValues?.trucks_count),
				status                  : 'active',
				trade_type,
				commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,

			}];
		} return [{
			destination_location_id : formValues?.location_id,
			origin_location_id      : port?.id,
			trip_type               : 'one_way',
			truck_type              : formValues?.truck_type,
			trucks_count            : Number(formValues?.trucks_count),
			...common,
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
		}];
	}

	return null;
};

const formatPayload = ({
	formValues = {},
	service = {},
	shipment_data = {},
	primary_service,
}) => {
	const search_type = service?.service_type?.replace('_service', '');

	const { trade_type = '' } = service || {};

	const rawParams = {
		trade_type,
		search_type,
		primary_service,
		formValues,

	};

	const newPayload = {
		search_type,
		source                                 : 'upsell',
		source_id                              : shipment_data?.id,
		importer_exporter_id                   : shipment_data?.importer_exporter_id,
		importer_exporter_branch_id            : shipment_data?.importer_exporter_branch_id,
		user_id                                : shipment_data?.importer_exporter_poc_id,
		[`${search_type}_services_attributes`] : formatDataForSingleService({
			rawParams,
		}),
	};

	return { payload: newPayload };
};

export default formatPayload;
