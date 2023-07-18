import { IcMAppCfs, IcMAppCustoms, IcMAppTruck } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getMapping = ({ primaryService = {}, otherServices = {} }) => {
	// const origin_main_port_name = primaryService?.origin_main_port?.display_name
	// 	|| primaryService?.origin_port?.display_name;
	const originDisplayNameArray = primaryService?.origin_port?.display_name.split(',');
	const originName = `${primaryService?.origin_port?.name} - 
	${originDisplayNameArray.reverse()[1]}`;

	const destinationDisplayNameArray = primaryService?.destination_port?.display_name.split(',');
	const destinatioName = `${primaryService?.destination_port?.name} - 
	${destinationDisplayNameArray.reverse()[1]}`;

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

	const freightTypeIncoTermsMapping = {
		fcl_freight: [
			{
				icon  : IcMAppTruck,
				label : 'Delhi - Mumbai',
				key   : Object.keys(hash).includes('origin_ftl_freight')
					? 'origin_ftl_freight'
					: 'origin_trailer_freight',
			},
			// primaryService?.origin_main_port?.display_name && {
			// 	type     : 'text',
			// 	iconName : '',
			// 	label    : primaryService?.origin_port?.display_name,
			// },
			// primaryService?.origin_main_port?.display_name && {
			// 	type     : 'icon',
			// 	iconName : 'origin_haulage_freight',
			// },
			{
				icon  : IcMAppCustoms,
				label : 'Nhava Seva Customs',
				key   : 'origin_fcl_customs',
			},
			{
				icon  : IcMAppCfs,
				label : 'Nhava Seva CFS Clearance',
				key   : 'origin_fcl_cfs',
			},
			{
				icon  : IcMAppCustoms,
				label : startCase('origin_fcl_freight_local'),
				key   : 'origin_fcl_freight_local',
			},
			{ type: 'icon', key: 'fcl_freight' },
			{
				icon  : IcMAppCustoms,
				label : startCase('destination_fcl_freight_local'),
				key   : 'destination_fcl_freight_local',
			},
			// { type: 'icon', iconName: 'destination_fcl_freight_local' },
			{
				icon  : IcMAppCfs,
				label : 'Jebel Ali CFS Clearance',
				key   : 'destination_fcl_cfs',
			},
			{
				icon  : IcMAppCustoms,
				label : 'Jebel Ali Customs',
				key   : 'destination_fcl_customs',
			},
			// primaryService?.destination_main_port?.name && {
			// 	type     : 'icon',
			// 	iconName : 'destination_haulage_freight',
			// },
			primaryService?.destination_port?.name && {
				icon  : IcMAppTruck,
				label : destinatioName,
				key   : Object.keys(hash).includes('destination_ftl_freight')
					? 'destination_ftl_freight'
					: 'destination_trailer_freight',
			},
		],
	};

	const servicesMapping = freightTypeIncoTermsMapping.fcl_freight.filter((item) => item);

	return {
		selectedServices,
		servicesMapping,
	};
};

export default getMapping;
