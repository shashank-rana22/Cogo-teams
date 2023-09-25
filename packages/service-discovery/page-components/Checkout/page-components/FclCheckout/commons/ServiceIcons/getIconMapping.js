const getIconMapping = ({ primaryService = {}, detailedServices = {} }) => {
	const origin_main_port_name =		primaryService?.origin_main_port?.display_name
		|| primaryService?.origin_port?.display_name;
	const destination_main_port_name =		primaryService?.destination_main_port?.display_name
		|| primaryService?.destination_port?.display_name;

	const HASH = {};

	const selectedServices = (Object.values(detailedServices) || []).map(
		(per_service) => {
			if (per_service?.trade_type === 'export') {
				if (
					per_service?.service_type === 'trailer_freight'
					|| per_service?.service_type === 'ftl_freight'
				) {
					HASH[`origin_${per_service?.service_type}`] = per_service?.origin_location?.display_name;
				}
				return `origin_${per_service?.service_type}`;
			}
			if (per_service?.trade_type === 'import') {
				if (
					per_service?.service_type === 'trailer_freight'
					|| per_service?.service_type === 'ftl_freight'
				) {
					HASH[`destination_${per_service?.service_type}`] = per_service?.destination_location?.display_name;
				}
				return `destination_${per_service?.service_type}`;
			}
			return per_service.service_type;
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
			primaryService?.origin_main_port?.display_name && {
				type     : 'text',
				iconName : '',
				label    : primaryService?.origin_port?.display_name,
			},
			primaryService?.origin_main_port?.display_name && {
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

			primaryService?.destination_main_port?.name && {
				type     : 'icon',
				iconName : 'destination_haulage_freight',
			},

			primaryService?.destination_main_port?.display_name && {
				type     : 'text',
				iconName : Object.keys(HASH).includes('destination_ftl_freight')
					? 'destination_ftl_freight'
					: 'destination_trailer_freight',
				label: primaryService?.destination_port?.display_name,
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
	};

	const iconMapping = freightTypeIncoTermsMapping.fcl_freight.filter((item) => item);

	return {
		selectedServices,
		iconMapping,
	};
};

export default getIconMapping;
