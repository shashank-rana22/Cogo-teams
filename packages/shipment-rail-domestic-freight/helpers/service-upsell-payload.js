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
		destination_country_id,
		origin_country_id,
		commodity,
		volume,
		weight,
		cargo_weight_per_container,
		container_size,
		container_type,
		containers_count,
	} = primary_service || {};

	const common = {
		commodity : commodity !== 'all_commodity' ? commodity : 'general',
		volume    : Number(volume),
		weight    : Number(weight),
		status    : 'active',
		trade_type,
	};

	if (search_type === 'trailer_freight') {
		if (trade_type === 'export') {
			return [{
				trade_type              : common.trade_type,
				commodity               : common.commodity,
				status                  : common.status,
				origin_location_id      : formValues?.location_id,
				destination_location_id : primary_service?.origin_location?.id,
				cargo_weight_per_container,
				container_size,
				container_type,
				containers_count,
			}];
		}

		return [{
			trade_type              : common.trade_type,
			commodity               : common.commodity,
			status                  : common.status,
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.destination_location?.id,
			cargo_weight_per_container,
			container_size,
			container_type,
			containers_count,
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
				destination_location_id : primary_service?.origin_location?.id,
				trip_type               : 'one_way',
				truck_type              : formValues?.truck_type,
				trucks_count            : Number(formValues?.trucks_count),
				...common,
				commodity               : HAZ_CLASSES.includes(commodity) ? commodity : null,

			}];
		} return [{
			destination_location_id : formValues?.location_id,
			origin_location_id      : primary_service?.destination_location?.id,
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
	organization_id = '',
	user = {},
}) => {
	const search_type = service?.service_type?.replace('_service', '');
	const { id, importer_exporter_branch_id, importer_exporter_id, user_id } = shipment_data;

	const { trade_type = '' } = service || {};

	const rawParams = {
		trade_type,
		search_type,
		primary_service,
		formValues,
		organization_id,
		user,
	};

	const newPayload = {
		source                                 : 'upsell',
		source_id                              : id,
		search_type,
		importer_exporter_id,
		importer_exporter_branch_id,
		user_id,
		[`${search_type}_services_attributes`] : formatDataForSingleService({ rawParams }),
	};

	return { payload: newPayload };
};

export default formatPayload;
