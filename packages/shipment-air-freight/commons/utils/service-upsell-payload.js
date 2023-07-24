import { HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';

const TYPE_NUMBER_FIELDS = ['length', 'width', 'height', 'packages_count', 'package_weight', 'trucks_count'];

const SINGLE_PACKAGE = 1;

const formattedAsNumberData = (values) => {
	const FORMATTED_VALUES = {};
	Object.entries(values).forEach(([key, val]) => {
		if (TYPE_NUMBER_FIELDS.includes(key) && typeof val === 'string') {
			FORMATTED_VALUES[key] = parseInt(val, 10);
		} else {
			FORMATTED_VALUES[key] = val;
		}
	});
	return FORMATTED_VALUES;
};

const formatDataForSingleService = ({ rawParams = {} }) => {
	const { trade_type = '', search_type = '', primary_service = {}, formValues = {} } = rawParams || {};

	const {
		destination_country_id,
		origin_country_id,
		commodity,
		volume,
		weight,
		packages_count,
		commodity_details,
		packages,
	} = primary_service || {};

	const common = {
		commodity : commodity !== 'all_commodity' ? commodity : 'general',
		volume    : Number(volume),
		weight    : Number(weight),
		status    : 'active',
		trade_type,
	};

	const common2 = {
		packages,
		commodity_details,
		packages_count: Number(packages_count || SINGLE_PACKAGE),
	};

	if (search_type === 'air_customs') {
		if (trade_type === 'export') {
			return [{
				airport_id: primary_service?.origin_airport?.id,
				...common,
				...common2,
			}];
		} return [{
			airport_id: primary_service?.destination_airport?.id,
			...common,
			...common2,
		}];
	}

	if (search_type === 'warehouse') {
		if (trade_type === 'export') {
			return [{
				location_id              : primary_service?.origin_airport?.id,
				expected_cargo_gated_in  : formValues?.expected_cargo_gated_in,
				expected_cargo_gated_out : formValues?.expected_cargo_gated_in,
				...common,
				...common2,
			}];
		} return [{
			location_id              : primary_service?.destination_airport?.id,
			expected_cargo_gated_in  : formValues?.expected_cargo_gated_in,
			expected_cargo_gated_out : formValues?.expected_cargo_gated_in,
			...common,
			...common2,
		}];
	}

	if (search_type === 'ltl_freight') {
		if (trade_type === 'export') {
			return [{
				origin_location_id : formValues?.location_id,
				destination_country_id,
				...common,
				commodity          : HAZ_CLASSES.includes(commodity) ? commodity : null,
				packages           : formValues?.packages?.map((obj) => formattedAsNumberData(obj)),
			}];
		}
		return [{
			destination_location_id : formValues?.location_id,
			origin_country_id,
			...common,
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
			packages                : formValues?.packages?.map((obj) => formattedAsNumberData(obj)),
		}];
	}

	if (search_type === 'ftl_freight') {
		if (trade_type === 'export') {
			return [{
				origin_location_id      : formValues?.location_id,
				destination_location_id : primary_service?.origin_airport?.id,
				trip_type               : 'one_way',
				truck_type              : formValues?.truck_type,
				trucks_count            : Number(formValues?.trucks_count),
				...common,
				commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,

			}];
		} return [{
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.destination_airport?.id,
			trip_type               : 'one_way',
			truck_type              : formValues?.truck_type,
			trucks_count            : Number(formValues?.trucks_count),
			...common,
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
		}];
	}

	if (search_type === 'air_freight_local') {
		return [{
			airport_id:
				trade_type === 'export'
					? primary_service?.origin_airport?.id
					: primary_service?.destination_airport?.id,
			airline_id: primary_service?.airline_id || primary_service?.airline?.id,
			...common,
			...common2,
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
		user_id                                : shipment_data?.user_id,
		[`${search_type}_services_attributes`] : formatDataForSingleService({
			rawParams,
		}),
	};

	return { payload: newPayload };
};

export default formatPayload;
