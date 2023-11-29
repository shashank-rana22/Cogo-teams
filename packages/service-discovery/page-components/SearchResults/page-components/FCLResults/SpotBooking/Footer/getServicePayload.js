import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

const INCO_TERM_EXPORT = ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp'];

const getServiceWisePayload = ({
	service = {},
	values = {},
	haulageOriginLocationId = '',
	haulageDestinationLocationId = '',
	tradeType = '',
}) => {
	const default_service_provider_id = geo.uuid.cogo_freight_supplier;

	const free_days = INCO_TERM_EXPORT.includes(service?.inco_term) ? 4 : 10;

	const MAPPING = {
		fcl_freight: {
			origin_port_id                  : service?.origin_port_id,
			destination_port_id             : service?.destination_port_id,
			container_size                  : service?.container_size,
			container_type                  : service?.container_type,
			commodity                       : service?.commodity,
			containers_count                : service?.containers_count,
			bls_count                       : service?.bls_count,
			bl_type                         : service?.bl_type,
			inco_term                       : service?.inco_term,
			cargo_weight_per_container      : service?.cargo_weight_per_container,
			refer_temperature               : service?.refer_temperature,
			refer_humidity                  : service?.refer_humidity,
			refer_ventilation               : service?.refer_ventilation,
			refer_vent_setting              : service?.refer_vent_setting,
			origin_cargo_handling_type      : service?.origin_cargo_handling_type,
			destination_cargo_handling_type : service?.destination_cargo_handling_type,
			shipping_line_id:
				values?.shipping_line_id
				|| service?.shipping_line_id
				|| service?.selected_shipping_line_id,
			origin_main_port_id: service?.origin_port?.is_icd
				? values?.origin_main_port_id || service?.origin_main_port_id
				: undefined,
			destination_main_port_id: service?.destination_port?.is_icd
				? values?.destination_main_port_id || service?.destination_main_port_id
				: undefined,
			departure           : values?.departure || undefined,
			arrival             : values?.arrival || undefined,
			service_provider_id : default_service_provider_id,
			transit_time        : values?.transit_time || undefined,
			number_of_stops     : values?.number_of_stops || undefined,
			rate                : {
				line_items     : [],
				margins        : [],
				source         : 'spot_line_booking',
				likes_count    : values?.likes_count,
				dislikes_count : values?.dislikes_count,
				is_liked       : values?.is_liked || 0,
				is_disliked    : values?.is_disliked || 0,
			},
			free_days_origin_detention:
				Number(values?.origin_detention)
				|| Number(values?.origin_detention?.free_limit)
				|| 0,
			free_days_origin_demurrage:
				Number(values?.origin_demurrage)
				|| Number(values?.origin_demurrage?.free_limit)
				|| 0,
			free_days_origin_plugin:
				Number(values?.origin_plugin?.free_limit) || free_days,
			free_days_destination_detention:
				Number(values?.destination_detention)
				|| Number(values?.destination_detention?.free_limit)
				|| 0,
			free_days_destination_demurrage:
				Number(values?.destination_demurrage)
				|| Number(values?.destination_demurrage?.free_limit)
				|| 0,
			free_days_destination_plugin:
				Number(values?.destination_plugin?.free_limit) || free_days,
			status                         : 'active',
			indicative_sell_price_currency : values?.indicative_sell_price_currency,
			indicative_sell_price          : values?.indicative_sell_price,
		},
		fcl_freight_local: {
			port_id                    : service?.port_id,
			trade_type                 : service?.trade_type,
			container_size             : service?.container_size,
			container_type             : service?.container_type,
			commodity                  : service?.commodity,
			containers_count           : service?.containers_count,
			cargo_weight_per_container : service?.cargo_weight_per_container,
			free_days_detention        : 2,
			free_days_demurrage        : 2,
			free_days_plugin           : 2,
			shipping_line_id           : values?.shipping_line_id,
			service_provider_id        : default_service_provider_id,
			rate                       : {
				line_items : [],
				margins    : [],
				source     : 'billed_at_actuals',
			},
			bls_count : 1,
			status    : 'active',
		},
		haulage_freight: {
			cargo_weight_per_container : service?.cargo_weight_per_container,
			container_size             : service?.container_size,
			container_type             : service?.container_type,
			commodity                  : service?.commodity,
			containers_count           : service?.containers_count,
			destination_location_id    : haulageDestinationLocationId,
			origin_location_id         : haulageOriginLocationId,
			status                     : 'active',
			trade_type                 : tradeType,
			transport_mode             : 'rail',
			haulage_type               : 'carrier',
			service_type               : 'haulage_freight',
			shipping_line_id           : values?.shipping_line_id,
		},
	};

	return MAPPING[service?.service_type] || undefined;
};

const getServicePayload = ({
	fclServices = [],
	formValues = {},
	detentionValues = {},
	primaryServices = [],
}) => {
	const fclServiceAttributes = fclServices.reduce(
		(acc, cur) => ({
			...acc,
			[`${cur.service_type}_services_attributes`]: [
				...(acc[`${cur.service_type}_services_attributes`] || []),
				getServiceWisePayload({
					service : cur,
					values  : { ...formValues, ...detentionValues },
				}),
			],
		}),
		{},
	);

	const haulageServiceAttributes = primaryServices.reduce((acc, cur) => {
		const HAULAGE_ARRAY = [];

		if (cur.destination_port.is_icd) {
			HAULAGE_ARRAY.push(getServiceWisePayload({
				service                      : { ...cur, service_type: 'haulage_freight' },
				values                       : { ...formValues, ...detentionValues },
				haulageOriginLocationId      : formValues.destination_main_port_id,
				haulageDestinationLocationId : cur.destination_port_id,
				tradeType                    : 'import',
			}));
		}

		if (cur.origin_port.is_icd) {
			HAULAGE_ARRAY.push(getServiceWisePayload({
				service                      : { ...cur, service_type: 'haulage_freight' },
				values                       : { ...formValues, ...detentionValues },
				haulageOriginLocationId      : cur.origin_port_id,
				haulageDestinationLocationId : formValues.origin_main_port_id,
				tradeType                    : 'export',
			}));
		}

		return {
			...acc,
			haulage_freight_services_attributes: [...(acc.haulage_freight_services_attributes || []), ...HAULAGE_ARRAY],
		};
	}, {});

	return { ...fclServiceAttributes, ...haulageServiceAttributes };
};

export default getServicePayload;
