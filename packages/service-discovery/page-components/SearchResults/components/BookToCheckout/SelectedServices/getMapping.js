import { IcMAppCfs, IcMAppCustoms, IcMAppTruck } from '@cogoport/icons-react';

const getMapping = ({ primaryService = {}, otherServices = {} }) => {
	const hash = {};

	const selectedServices = (Object.values(otherServices) || []).map(
		(per_service) => {
			if (per_service?.trade_type === 'export') {
				if (
					per_service?.service_type === 'trailer_freight'
					|| per_service?.service_type === 'ftl_freight'
				) {
					hash[`origin_${per_service?.service_type}`] = per_service?.origin_location?.display_name;
				}
				return `origin_${per_service?.service_type}`;
			}
			if (per_service?.trade_type === 'import') {
				if (
					per_service?.service_type === 'trailer_freight'
					|| per_service?.service_type === 'ftl_freight'
				) {
					hash[`destination_${per_service?.service_type}`] = per_service?.destination_location?.display_name;
				}
				return `destination_${per_service?.service_type}`;
			}
			return per_service.service_type;
		},
	);

	const servicesMapping = [
		{
			icon : IcMAppTruck,
			key  : Object.keys(hash).includes('origin_ftl_freight')
				? 'origin_ftl_freight'
				: 'origin_trailer_freight',
		},
		primaryService?.origin_main_port?.display_name && {
			icon : IcMAppTruck,
			key  : 'origin_haulage_freight',
		},
		{
			icon : IcMAppCustoms,
			key  : 'origin_fcl_customs',
		},
		{
			icon : IcMAppCfs,
			key  : 'origin_fcl_cfs',
		},
		{
			icon : IcMAppCfs,
			key  : 'origin_fcl_freight_local',
		},
		{ type: 'icon', key: 'fcl_freight' },
		{
			icon : IcMAppCfs,
			key  : 'destination_fcl_freight_local',
		},
		{
			icon : IcMAppCfs,
			key  : 'destination_fcl_cfs',
		},
		{
			icon : IcMAppCustoms,
			key  : 'destination_fcl_customs',
		},
		primaryService?.destination_main_port?.display_name && {
			icon : IcMAppTruck,
			key  : 'destination_haulage_freight',
		},
		primaryService?.destination_port?.name && {
			icon : IcMAppTruck,
			key  : Object.keys(hash).includes('destination_ftl_freight')
				? 'destination_ftl_freight'
				: 'destination_trailer_freight',
		},
	];

	return {
		selectedServices,
		servicesMapping,
	};
};

export default getMapping;
