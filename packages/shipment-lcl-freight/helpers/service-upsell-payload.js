import { HAZ_CLASSES } from '@cogoport/globalization/constants/commodities';

const TYPE_NUMBER_FIELDS = ['length', 'width', 'height', 'packages_count', 'package_weight', 'trucks_count'];
const DEFAULT_PACKAGE_COUNT = 1;
const DEFAULT_BL_COUNT = 1;

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
		bls_count,
	} = primary_service || {};

	const common = {
		commodity : commodity !== 'all_commodity' ? commodity : 'general',
		volume    : Number(volume),
		weight    : Number(weight),
		status    : 'active',
		trade_type,
	};

	const common2 = {
		bls_count      : Number(bls_count || DEFAULT_BL_COUNT),
		packages_count : Number(packages_count || DEFAULT_PACKAGE_COUNT),
	};

	if (search_type === 'lcl_customs') {
		if (trade_type === 'export') {
			return [{
				location_id: primary_service?.origin_port?.id,
				...common,
				...common2,
			}];
		} return [{
			location_id: primary_service?.destination_port?.id,
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
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
			...common,
			packages                : formValues?.packages?.map((obj) => formattedAsNumberData(obj)),
		}];
	}

	if (search_type === 'ftl_freight') {
		if (trade_type === 'export') {
			return [{
				origin_location_id      : formValues?.location_id,
				destination_location_id : primary_service?.origin_port?.id,
				trip_type               : 'one_way',
				truck_type              : formValues?.truck_type,
				trucks_count            : Number(formValues?.trucks_count),
				...common,
				commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,

			}];
		} return [{
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.destination_port?.id,
			trip_type               : 'one_way',
			truck_type              : formValues?.truck_type,
			trucks_count            : Number(formValues?.trucks_count),
			...common,
			commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,
		}];
	}

	if (search_type === 'lcl_freight_local') {
		return [{
			port_id:
				trade_type === 'export'
					? primary_service?.origin_port?.id
					: primary_service?.destination_port?.id,
			shipping_line_id: primary_service?.shipping_line?.id,
			...common,
			...common2,
		}];
	}

	if (search_type === 'cargo_insurance') {
		return [
			{
				cargo_insurance_commodity_description : formValues?.cargo_insurance_commodity_description,
				cargo_insurance_commodity_id          : formValues?.cargo_insurance_commodity,
				cargo_value                           : formValues?.cargo_value,
				cargo_value_currency                  : formValues?.cargo_value_currency,
				destination_country_id,
				origin_country_id,
				risk_coverage                         : 'all_risk',
				commodity                             : formValues?.commodity,
				status                                : 'active',
				transit_mode                          : `${formValues?.transitMode}`.toLowerCase(),
				trade_type,
				saas_rate                             : formValues?.rateData,

			},
		];
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
