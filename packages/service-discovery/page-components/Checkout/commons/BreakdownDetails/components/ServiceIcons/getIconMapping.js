const getIconMapping = ({ primaryService = {}, detailedServices = {}, primary_service = '' }) => {
	const {
		origin_main_port = {},
		origin_port = {},
		destination_main_port = {},
		destination_port = {},
		destination_airport = {},
		origin_airport,
	} = primaryService;

	const origin_main_port_name = origin_main_port?.display_name
		|| origin_port?.display_name
		|| origin_airport?.display_name;
	const destination_main_port_name = destination_main_port?.display_name
		|| destination_port?.display_name
		|| destination_airport?.display_name;

	const HASH = {};

	const selectedServices = Object.values(detailedServices || {}).map(
		(service) => {
			const {
				trade_type = '',
				service_type = '',
				origin_location = {},
				destination_location = {},
			} = service || {};

			if (trade_type === 'export') {
				if (
					['ftl_freight', 'ltl_freight', 'trailer_freight'].includes(
						service_type,
					)
				) {
					HASH[`origin_${service_type}`] = origin_location?.display_name;
				}

				return `origin_${service_type}`;
			}

			if (trade_type === 'import') {
				if (
					['ftl_freight', 'ltl_freight', 'trailer_freight'].includes(
						service_type,
					)
				) {
					HASH[`destination_${service_type}`] = destination_location?.display_name;
				}

				return `destination_${service_type}`;
			}

			return service.service_type;
		},
	);

	const freightTypeIncoTermsMapping = {
		fcl_freight: [
			{
				type     : 'text',
				iconName : '',
				label    : HASH?.origin_ftl_freight || HASH?.origin_trailer_freight,
				point    : 'origin',
			},
			{
				type     : 'icon',
				iconName : Object.keys(HASH).includes('origin_ftl_freight')
					? 'origin_ftl_freight'
					: 'origin_trailer_freight',
			},
			origin_main_port?.display_name && {
				type     : 'text',
				iconName : '',
				label    : origin_port?.display_name,
			},
			origin_main_port?.display_name && {
				type     : 'icon',
				iconName : 'origin_haulage_freight',
			},
			{ type: 'icon', iconName: 'origin_fcl_customs' },
			{ type: 'icon', iconName: 'origin_fcl_cfs' },
			{
				type     : 'text',
				iconName : '',
				label    : origin_main_port_name,
			},
			{ type: 'icon', iconName: 'origin_fcl_freight_local' },
			{ type: 'icon', iconName: 'fcl_freight' },
			{ type: 'icon', iconName: 'destination_fcl_freight_local' },
			{
				type     : 'text',
				iconName : '',
				label    : destination_main_port_name,
			},
			{ type: 'icon', iconName: 'destination_fcl_cfs' },
			{ type: 'icon', iconName: 'destination_fcl_customs' },

			destination_main_port?.name && {
				type     : 'icon',
				iconName : 'destination_haulage_freight',
			},

			destination_main_port?.display_name && {
				type     : 'text',
				iconName : Object.keys(HASH).includes('destination_ftl_freight')
					? 'destination_ftl_freight'
					: 'destination_trailer_freight',
				label: destination_port?.display_name,
			},

			{ type: 'icon', iconName: 'destination_trailer_freight' },

			{
				type     : 'text',
				iconName : '',
				label:
					HASH?.destination_ftl_freight || HASH?.destination_trailer_freight,
				point: 'Destination',
			},
		],
		air_freight: [
			{
				type     : 'text',
				iconName : '',
				label    : HASH?.origin_ftl_freight || HASH?.origin_ltl_freight,
				point    : 'origin',
			},
			{
				type     : 'icon',
				iconName : Object.keys(HASH).includes('origin_ftl_freight')
					? 'origin_ftl_freight'
					: 'origin_ltl_freight',
			},
			{ type: 'icon', iconName: 'origin_air_customs' },
			{
				type     : 'text',
				iconName : '',
				label    : origin_main_port_name,
			},
			{ type: 'icon', iconName: 'origin_air_freight_local' },
			{ type: 'icon', iconName: 'air_freight' },
			{ type: 'icon', iconName: 'destination_air_freight_local' },
			{
				type     : 'text',
				iconName : '',
				label    : destination_main_port_name,
			},
			{ type: 'icon', iconName: 'destination_air_customs' },
			{
				type     : 'icon',
				iconName : Object.keys(HASH).includes('destination_ftl_freight')
					? 'destination_ftl_freight'
					: 'destination_ltl_freight',
			},
			{
				type     : 'text',
				iconName : '',
				label    : HASH?.destination_ftl_freight || HASH?.destination_ltl_freight,
				point    : 'Destination',
			},
		],
	};

	const iconMapping = (
		freightTypeIncoTermsMapping[primary_service] || []
	).filter((item) => item);

	return {
		selectedServices,
		iconMapping,
	};
};

export default getIconMapping;
